const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Question = require('../models/question');
const Quizz = require('../models/quizz');

// Vérifier que toutes les propositions sont différentes
validatePropositions = (q) => {
    const props = [...[q.proposition1, q.proposition2, q.proposition3, q.proposition4]];
    const set = new Set(props);
    if (set.size !== 4)
        return false;
    return true;
}

// Vérifier que la réponse figure parmis les propositions
validateReponse = (q) => {
    const props = [...[q.proposition1, q.proposition2, q.proposition3, q.proposition4]];
    const index = props.findIndex(prop => prop === q.reponse);
    if (index < 0)
        return false;
    return true;
}

// Créer une nouvelle question
router.post('/questions', auth, async (req, res) => {
    console.log("ADD : ", req.body);
    const question = new Question({
        contenu: req.body.contenu,
        reponse: req.body.reponse,
        proposition1: req.body.proposition1,
        proposition2: req.body.proposition2,
        proposition3: req.body.proposition3,
        proposition4: req.body.proposition4
    });
    if (!validatePropositions(question))
        return res.status(409).send({ error: "Vous avez donné une ou plusieurs propositions identiques" })

    if (!validateReponse(question))
        return res.status(409).send({ error: "La réponse doit se trouver parmis les propositions !" })

    try {
        const savedQuestion = await question.save();

        const quizzId = req.body.quizzId;
        const quizz = await Quizz.findById(quizzId);
        quizz.questions.push(savedQuestion._id);
        await quizz.save()
        res.status(201).send(question);
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            res.status(409).send({ error: "La question que vous avez indiqué existe déja" })
        } else {
            res.status(400).send({ error: "Requête male formulée" });
        }
    }
})

// Récuperer toutes les questions
router.get('/questions', auth, async (req, res) => {
    const questions = await Question.find({});
    try {
        res.send(questions);
    } catch (e) {
        res.status(500).send({ error: "Erreur interne du serveur" });
    }
})

// Récuperer une question par son ID
router.get('/questions/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const question = await Question.findOne({ _id })
        if (!question) {
            return res.status(404).send({ error: "La question que vous recherchez n'éxiste pas" });
        }

        res.send(question);
    } catch (e) {
        res.status(500).send({ error: "Erreur interne du serveur" });
    }
})


// Mettre à jour une question par son ID
router.patch('/questions/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['contenu', 'reponse', 'proposition1', 'proposition2', 'proposition3',
        'proposition4'];

    const isOperationValid = updates.every((update) => allowedUpdates.includes(update));

    if (!isOperationValid) {
        return res.status(400).send({ error: 'Modification invalide !' });
    }

    try {
        const question = await Question.findOne({ _id: req.params.id })

        if (!question) {
            return res.status(404).send();
        }

        updates.forEach((update) => question[update] = req.body[update]);
        await question.save();

        res.send(question);
    } catch (e) {
        res.status(400).send({ error: "Requête mal formée" });
    }
})

// Supprimer une question
router.delete('/questions/:id', auth, async (req, res) => {
    try {
        const question = await Question.findOneAndDelete({ _id: req.params.id });
        if (!question) {
            return res.status(404).send({ error: "La question que vous recherchez n'éxiste pas" });
        }

        res.send(question);
    } catch (e) {
        res.status(500).send({ error: "Erreur interne du serveur" });
    }
})

module.exports = router;