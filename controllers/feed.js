const Post = require('../models/post')
const { validationResult } = require('express-validator/check') 

exports.getPosts = (req, res, next) => {
    const pstId = req.params.id
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
    Post.findById(pstId)
    .then(post => {
        if (!post) {
            return res.redirect('/')
        }
        res.render('edit-jobs', {
            pageTitle: 'Edit Jobs',
            path: '/edit-jobs/',
            post: post,
            oldInput: {
                job: '',
                description: '',
                address: '',
                zipCode: '',
                supplies: '',
                appointment: '',
                operator: ''
            },
            validationErrors: []  
        })
    })
    .catch(err => {
        const error = new Error(err)
        error.httpStatusCode = 500
        return next(error) 
    })   
}

exports.postEditPost = (req, res, next) => {
    
    const pstId = req.body._id
    const updatedJob = req.body.job
    const updatedDescription = req.body.description
    const updatedAddress = req.body.address
    const updatedZipCode = req.body.zipCode
    const updatedSupplies = req.body.supplies
    const updatedAppointment = req.body.appointment 
    const updatedOperator = req.body.operator

    Post.findById(pstId)
        .then(post => {
            post.job = updatedJob
            post.description = updatedDescription
            post.address = updatedAddress
            post.zipCode = updatedZipCode
            post.supplies = updatedSupplies
            post.appointment = updatedAppointment
            post.operator = updatedOperator   
            return post.save()
        })
        .then(result => {
            console.log('UPDATED POST')
            res.redirect('/feed/posts')
        })
        .catch(err => {
            console.log(err)
        })
    }   