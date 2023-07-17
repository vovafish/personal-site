import express, { Response, Request, Application } from "express"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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
        res.json(project)
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
        res.json(project);
    } else {
        res.send(`That project doesn't exist`)
    }
});

app.post('/api/register', async (req, res) => {
    const { email, password, first_name, last_name, phone_number } = req.body;

    const user = await db.collection('users').findOne({ email })

    if (user) {
        res.sendStatus(409); //conflict code error
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await db.collection('users').insertOne({
        email,
        first_name,
        last_name,
        phone_number,
        passwordHash,
        isVerified: false,
        isAdmin: false,
    });
    const { insertedId } = result;

    jwt.sign({
        id: insertedId,
        email,
        first_name,
        last_name,
        phone_number,
        passwordHash,
        isVerified: false,
        isAdmin: false,

    },
        process.env.JWT_SECRET,
        {
            expiresIn: '2d',
        },
        (err, token) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json({ token });
        }
    )
})

connectToDb(() => {
    console.log("Connected to the DB");
    app.listen(8000, () => {
        console.log(`Listening on port 8000`);

    });
});