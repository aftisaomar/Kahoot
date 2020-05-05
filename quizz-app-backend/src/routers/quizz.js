const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Quizz = require('../models/quizz');


// Créer un nouveau quizz
router.post('/quizzes', auth, async (req, res) => {
    const quizz = new Quizz({
        ...req.body,
    })

    try {
        await quizz.save();
        res.status(201).send(quizz);
    } catch (e) {
        res.status(400).send();
    }
})

// Récuperer tous les quizzes
router.get('/quizzes', auth, async (req, res) => {
    try {
        const quizzes = await Quizz.find({}).populate('questions');
        res.send(quizzes);
    } catch (e) {
        res.status(500).send();
    }
})

// Récuperer un quizz par son ID
router.get('/quizzes/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        let quizz = await Quizz.findOne({ _id }).populate('questions');
        if (!quizz) {
            return res.status(404).send({ error: "Le quizz que vous recherchez n'éxiste pas" });
        }
        res.send(quizz);
    } catch (e) {
        res.status(500).send();
    }
})


// Mettre à jour un quizz par son ID
router.patch('/quizzes/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['titre', 'description'];

    const isOperationValid = updates.every((update) => allowedUpdates.includes(update));

    if (!isOperationValid) {
        return res.status(400).send({ error: 'Modification invalide !' });
    }

    try {
        const quizz = await (await Quizz.findOne({ _id: req.params.id })).populate('questions')

        if (!quizz) {
            return res.status(404).send({ error: "Le quizz que vous recherchez n'éxiste pas" });
        }

        updates.forEach((update) => quizz[update] = req.body[update]);
        await quizz.save();

        res.send(quizz);
    } catch (e) {
        res.status(400).send({ error: "Requête mal formulée" });
    }
})

// Supprimer un quizz
router.delete('/quizzes/:id', auth, async (req, res) => {
    try {
        const quizz = await Quizz.findOneAndDelete({ _id: req.params.id });
        if (!quizz) {
            return res.status(404).send({ error: "Le quizz que vous recherchez n'éxiste pas" });
        }

        res.send(quizz);
    } catch (e) {
        res.status(500).send({ error: "Erreur interne du serveur" });
    }
})

module.exports = router;