import express, {Response, Request, Application} from "express"

const app: Application = express()

app.get('/hello', (req: Request, res: Response) => {
    res.send('Hello');
})

app.listen(8000, () => {
    console.log(`Listening on port 8000`);
    
})

console.log("Hi");
