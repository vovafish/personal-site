import express, {Response, Request, Application} from "express"

let projectsInfo = [{
    link: 'project1',
    upvotes: 0,
}, {
    link: 'project2',
    upvotes: 0,
}, {
    link: 'project3',
    upvotes: 0,
}, {
    link: 'project4',
    upvotes: 0,
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

app.listen(8000, () => {
    console.log(`Listening on port 8000`);
    
})
