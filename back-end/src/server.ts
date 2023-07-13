import express, {Response, Request, Application} from "express"
import { MongoClient } from "mongodb"

const app: Application = express()
// middleware
app.use(express.json())

app.get('/api/projects/:link', async (req, res) => {
    const {link} = req.params;

    const client = new MongoClient('mongodb://127.0.0.1:27017');

    await client.connect();

    const db = client.db('my-presonal-projects'); // reference to the db

    const project = await db.collection('projects').findOne({ link });

    if (project) {
        res.json(project);
    } else {
        res.sendStatus(404).send('Project not found');
    }


})

app.put('/api/projects/:link/upvote', async (req, res) => {
    const {link} = req.params;
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db = client.db('my-presonal-projects'); // reference to the db
    await db.collection('projects').updateOne({ link }, {
        $inc: {upvotes: 1}
    });
    const project = await db.collection('projects').findOne({ link })
    if (project) {
        project.upvotes += 1
        res.send(`The ${link} project now has ${project.upvotes} upvotes`)
    } else {
        res.send(`That project doesn't exists`)
    }
})

app.post('/api/projects/:link/comments', (req, res) => {
    const {link} = req.params;
    const {postedBy, text} = req.body;

    const project = projectsInfo.find(p => p.link === link);

    if (project) {
        project.comments.push({postedBy, text});
        res.send(project.comments);
    } else {
        res.send(`That project doesn't exist`)
    }
})

app.listen(8000, () => {
    console.log(`Listening on port 8000`);
    
})
