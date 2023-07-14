import express, { Response, Request, Application } from "express"
import { MongoClient } from "mongodb"

import { db, connectToDb } from "./db.js"

const app: Application = express()
// middleware
app.use(express.json())

app.get('/api/projects/:link', async (req, res) => {
    const { link } = req.params;

    const project = await db.collection('projects').findOne({ link });

    if (project) {
        res.json(project);
    } else {
        res.sendStatus(404);
    }


})

app.put('/api/projects/:link/upvote', async (req, res) => {
    const { link } = req.params;

    await db.collection('projects').updateOne({ link }, {
        $inc: { upvotes: 1 }
    });
    const project = await db.collection('projects').findOne({ link })
    if (project) {
        res.send(`The ${link} project now has ${project.upvotes} upvotes`)
    } else {
        res.send(`That project doesn't exists`)
    }
})

app.post('/api/projects/:link/comments', async (req, res) => {
    const { link } = req.params;
    const { postedBy, text } = req.body;


    await db.collection('projects').updateOne({ link }, {
        $push: { comments: { postedBy, text } },
    });

    const project = await db.collection('projects').findOne({ link })

    if (project) {
        res.send(project.comments);
    } else {
        res.send(`That project doesn't exist`)
    }
});

connectToDb(() => {
    console.log("Connected to the DB");
    app.listen(8000, () => {
        console.log(`Listening on port 8000`);

    });
});