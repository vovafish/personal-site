import express, {Response, Request, Application} from "express"

let projectsInfo: any = [{
    link: 'project1',
    upvotes: 0,
    comments: []
}, {
    link: 'project2',
    upvotes: 0,
    comments: []
}, {
    link: 'project3',
    upvotes: 0,
    comments: []
}, {
    link: 'project4',
    upvotes: 0,
    comments: []
}]

const app: Application = express()
// middleware
app.use(express.json())

app.put('/api/projects/:link/upvote', (req, res) => {
    const {link} = req.params;
    const project  = projectsInfo.find(p => p.link === link)
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
