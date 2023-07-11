import express, {Response, Request, Application} from "express"

const app: Application = express()
// middleware
app.use(express.json())

app.post('/hello', (req: Request, res: Response) => {
    console.log(req.body);
    res.send('Hello');
})

app.listen(8000, () => {
    console.log(`Listening on port 8000`);
    
})

console.log("Hi");
