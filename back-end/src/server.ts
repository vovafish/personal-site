import express, { Response, Request, Application } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid'
import { ObjectId } from 'mongodb';

import { db, connectToDb } from './db.js';
import sendEmail from './util/sendEmail.js';

const app: Application = express();
// middleware
app.use(express.json());

app.get('/api/projects/:link', async (req, res) => {
  const { link } = req.params;

  const project = await db.collection('projects').findOne({ link });

  if (project) {
    res.json(project);
  } else {
    res.sendStatus(404);
  }
});

app.put('/api/projects/:link/upvote', async (req, res) => {
  const { link } = req.params;

  await db.collection('projects').updateOne(
    { link },
    {
      $inc: { upvotes: 1 },
    }
  );
  const project = await db.collection('projects').findOne({ link });
  if (project) {
    res.json(project);
  } else {
    res.send(`That project doesn't exists`);
  }
});

app.post('/api/projects/:link/comments', async (req, res) => {
  const { link } = req.params;
  const { postedBy, text } = req.body;

  await db.collection('projects').updateOne(
    { link },
    {
      $push: { comments: { postedBy, text } },
    }
  );

  const project = await db.collection('projects').findOne({ link });

  if (project) {
    res.json(project);
  } else {
    res.send(`That project doesn't exist`);
  }
});

app.put('/api/verify-email', async (req, res) => {
  const { verificationString } = req.body;
  const result = await db.collection('users').findOne({
    verificationString,
  });

  if (!result) {
    res.status(401).json({ message: 'The email verification code is not correct!' })
  }
  const { _id: id, email } = result;
  console.log(result);

  await db.collection('users').updateOne({ _id: ObjectId(id) }, {
    $set: { isVerified: true }
  });

  jwt.sign({ id, email, isVerified: true }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
    if (err) {
      return res.sendStatus(500)
    }
    res.status(200).json({ token })
  });

})

app.post('/api/register', async (req, res) => {
  const { email, password, first_name, last_name, phone_number } = req.body;

  const user = await db.collection('users').findOne({ email });

  if (user) {
    res.sendStatus(409); // conflict code error
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
            <p>http://localhost:3000/#/api/verify-email/${verificationString}</p>
            <p>Regards Me</p>
        `,
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

  jwt.sign(
    {
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
  );
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await db.collection('users').findOne({ email });

  if (!user) {
    return res.sendStatus(401);
  }

  const {
    _id: id,
    isVerified,
    isAdmin,
    passwordHash,
    first_name,
    last_name,
    phone_number,
  } = user;

  const isCorrect = await bcrypt.compare(password, passwordHash);

  if (isCorrect) {
    jwt.sign(
      {
        id,
        isVerified,
        isAdmin,
        passwordHash,
        first_name,
        last_name,
        phone_number,
      },
      process.env.JWT_SECRET,
      { expiresIn: '2d' },
      (err, token) => {
        if (err) {
          res.status(500).json(err);
        }

        res.status(200).json({ token });
      }
    );
  } else {
    res.sendStatus(401);
  }
});

connectToDb(() => {
  console.log('Connected to the DB');
  app.listen(8000, () => {
    console.log(`Listening on port 8000`);
  });
});
