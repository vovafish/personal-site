import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { ObjectId } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { db, connectToDb } from './db.js';
import sendEmail from './util/sendEmail.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});
app.get('/api/projects/:link', async (req, res) => {
    const { link } = req.params;
    const project = await db.collection('projects').findOne({ link });
    if (project) {
        res.json(project);
    }
    else {
        res.sendStatus(404);
    }
});
app.put('/api/projects/:link/upvote', async (req, res) => {
    const { link } = req.params;
    const { user_id } = req.body; // Assuming you have the user_id of the current user in the request body
    // Check if the user has already upvoted the project
    const project = await db.collection('projects').findOne({ link, upvotedBy: user_id });
    if (project) {
        // If the user has already upvoted the project, return an error response
        return res.status(400).json({ message: 'You have already upvoted this project.' });
    }
    // If the user hasn't upvoted the project, increment the upvotes count and add the user_id to the upvotedBy array
    await db.collection('projects').updateOne({ link }, {
        $inc: { upvotes: 1 },
        $push: { upvotedBy: user_id },
    });
    // Get the updated project details
    const updatedProject = await db.collection('projects').findOne({ link });
    if (updatedProject) {
        res.json(updatedProject);
    }
    else {
        res.send(`That project doesn't exist`);
    }
});
app.post('/api/suggestion', async (req, res) => {
    const { postedBy, text, date } = req.body;
    await db.collection('suggestions').updateOne({}, {
        $push: { comments: { postedBy, text, date } },
    });
});
app.post('/api/projects/:link/comments', async (req, res) => {
    const { link } = req.params;
    const { postedBy, text, date } = req.body;
    await db.collection('projects').updateOne({ link }, {
        $push: { comments: { postedBy, text, date } },
    });
    const project = await db.collection('projects').findOne({ link });
    if (project) {
        res.json(project);
    }
    else {
        res.send(`That project doesn't exist`);
    }
});
app.put('/api/forgot-password/:email', async (req, res) => {
    const { email } = req.params;
    const passwordResetCode = uuid();
    const result = await db
        .collection('users')
        .updateOne({ email }, { $set: { passwordResetCode } });
    if (result.modifiedCount > 0) {
        try {
            await sendEmail({
                send_to: email,
                sent_from: process.env.EMAIL_USER,
                reply_to: email,
                subject: 'Password Reset',
                message: `
              <h3>Hello</h3>
              <p>To reset your password, click here:</p>
              <p>http://localhost:3000/#/reset-password/${passwordResetCode}</p>
              <p>Regards Me</p>
          `,
            });
        }
        catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
    res.sendStatus(200);
});
app.put('/api/verify-email', async (req, res) => {
    const { verificationString } = req.body;
    const result = await db.collection('users').findOne({
        verificationString,
    });
    if (!result) {
        res.status(401).json({ message: 'The email verification code is not correct!' });
    }
    const { _id: id, email, first_name, last_name, phone_number, isAdmin } = result;
    console.log(result);
    await db.collection('users').updateOne({ _id: new ObjectId(id) }, {
        $set: { isVerified: true }
    });
    jwt.sign({ id, email, isVerified: true, first_name, last_name, phone_number, isAdmin: false }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
        if (err) {
            return res.sendStatus(500);
        }
        res.status(200).json({ token });
    });
});
app.post('/api/register', async (req, res) => {
    const { email, password, first_name, last_name, phone_number } = req.body;
    const user = await db.collection('users').findOne({ email });
    if (user) {
        return res.sendStatus(409); // conflict code error
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const verificationString = uuid();
    const result = await db.collection('users').insertOne({
        email,
        first_name,
        last_name,
        phone_number,
        passwordHash,
        isVerified: false,
        isAdmin: false,
        verificationString,
    });
    const { insertedId } = result;
    try {
        await sendEmail({
            send_to: email,
            sent_from: process.env.EMAIL_USER,
            reply_to: email,
            subject: 'Please verify your email',
            message: `
            <h3>Hello</h3>
            <p>Here is your verification link, click here:</p>
            <p>http://localhost:3000/#/verify-email/${verificationString}</p>
            <p>Regards Me</p>
        `,
        });
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
    jwt.sign({
        id: insertedId,
        email,
        first_name,
        last_name,
        phone_number,
        passwordHash,
        isVerified: false,
        isAdmin: false,
    }, process.env.JWT_SECRET, {
        expiresIn: '2d',
    }, (err, token) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ token });
    });
});
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await db.collection('users').findOne({ email });
    if (!user) {
        return res.sendStatus(401);
    }
    const { _id: id, isVerified, isAdmin, passwordHash, first_name, last_name, phone_number, } = user;
    const isCorrect = await bcrypt.compare(password, passwordHash);
    if (isCorrect) {
        jwt.sign({
            id,
            isVerified,
            isAdmin,
            passwordHash,
            first_name,
            last_name,
            phone_number,
        }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json({ token });
        });
    }
    else {
        res.sendStatus(401);
    }
});
app.get('/api/projects', async (req, res) => {
    const projects = await db.collection('projects').find({}).toArray();
    if (projects) {
        res.json(projects);
    }
    else {
        res.sendStatus(404);
    }
});
app.put('/api/users/:passwordResetCode/reset-password', async (req, res) => {
    const { passwordResetCode } = req.params;
    const { newPassword } = req.body;
    // Hash the new password using the bcrypt library
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    // Update the user's document in the database to include the new password hash and remove the password reset code
    const result = await db.collection('users').findOneAndUpdate({ passwordResetCode }, {
        $set: { passwordHash: newPasswordHash },
        $unset: { passwordResetCode: '' },
    });
    // If no document was modified, return a 404 error
    if (result.lastErrorObject.n === 0)
        return res.sendStatus(404).json(`Error nothing to change`);
    // Return a success response
    res.sendStatus(200);
});
const PORT = process.env.PORT || 8000;
connectToDb(() => {
    console.log('Connected to the DB');
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
});
//# sourceMappingURL=server.js.map