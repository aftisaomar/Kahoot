const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');

const User = require('../models/user');

// Get current user
router.get('/users', auth, async (req, res) => {
    const users = await User.find({});
    res.send(users);
})

// Get current user
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
})

// Create User (SingUp)
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save()
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
})

// Update user via ID
router.patch('/users/me', auth, async (req, res) => {
    // Specify allowed updates
    const allowedUpdates = ['name', 'email', 'password', 'age']
    // Get the user's requested updates
    const updates = Object.keys(req.body);

    // Check updated field and send an error if a non-allowed field is being updated
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update !' });
    }

    try {
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});

        //We replace the findByIdAndUpdate by these lines to execute the "pre()" for hashing passwords
        const user = req.user
        updates.forEach(update => user[update] = req.body[update]);
        await user.save();

        res.send(user);
    } catch (e) {
        res.status(400).send(e)
    }
})


// Delete user via ID
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();

        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
})

let nombreConnexion = 0;

// Login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);//recherche dans la base
        const token = await user.generateAuthToken();
        res.send({ user, token });

        nombreConnexion++;

    } catch (e) {
        res.status(404).send("Nom d'utilisateur ou mot de pass incorrect");
    }
})

// Logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Full Logout
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

module.exports = {router, nombreConnexion};