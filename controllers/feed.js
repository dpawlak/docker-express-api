const Post = require('../models/post')
const { validationResult } = require('express-validator/check') 

exports.getPosts = (req, res, next) => {
    const postId = req.params.postId
    Post.find()
    .then(posts => {
        res.render('posts', {
            ps: posts,
            pageTitle: 'Posts',
            path:'/posts'
        })
    })
    .catch(err => {
        const error = new Error(err)
        error.httpStatusCode = 500
        return next(error)
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

exports.getEditPost = (req, res, next) => {

    const pstId = req.params.id
    console.log(req.body);
    Post.findById(pstId, req.body)
    .then(post => {
        if (!post) {
            return res.redirect('/')
        }
        res.render('edit-jobs', {
            pageTitle: 'Edit Jobs',
            path: '/edit-jobs/',
            post: post,
        })
    })
    .catch(err => {
        const error = new Error(err)
        error.httpStatusCode = 500
        return next(error) 
    })
        
}
