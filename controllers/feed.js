const Post = require('../models/post')

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{ title:"Daniel", content:"Data Collection Operator" }]
    })
}

exports.createPost = (req, res, next) => {
    const myData = new Post(req.body)
    myData.save()
    .then(item => {
        res.send("item saved to database...")
        
    })

    .catch(err => {
        res.status(400).send("unable to save to database!")
        console.log(err)
    })
}

    
// exports.getJobs = (req, res, next) => {
//     Post.find() 
//         .countDocuments()
//         .then(numJobs => {
//             totalItems = numJobs
//             return Post.find()
//         })
//         .then(jobs => {
//             res.render('/view-jobs', {
//             job:job
//             })
//         })
//         .catch(err => {
//             const error = new Error(err)
//             error.httpStatusCode = 500
//             return next(error)
//         })
// }