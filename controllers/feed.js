const Post = require('../models/post')
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const { validationResult } = require('express-validator/check')

const ITEMS_PER_PAGE = 1;

exports.getPosts = (req, res, next) => {
    const pstId = req.params.id
    const page = +req.query.page || 1
    let totalItems


    Post.find()
    .countDocuments()
    .then(numPosts => {
      totalItems = numPosts
      return Post.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
    })
    .then(posts => {
        res.render('posts', {
            ps: posts,
            pageTitle: 'Posts',
            path:'/posts',
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems/ITEMS_PER_PAGE)
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
        req.flash('success', 'Job Created')
        res.redirect('/')
    })
    .catch(err => {
        // make an error page
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
        .then(() => {
            req.flash('success', 'Job Updated')
            res.redirect('/feed/posts')
        })
        .catch(err => {
            console.log(err)
        })
    }

exports.deletePost = (req, res) => {
    const pstId = req.params.id
    Post.findByIdAndDelete(pstId)
   .then(result => {
        req.flash('success', 'Job Deleted')
        res.json({ redirect: '/feed/posts' })
   })
    .catch(err => {
        console.log(err)
    })
}

exports.getInvoice = (req, res, next) => {
    const pstId = req.params.id
    Post.findById(pstId)
        .then(post => {
            if (!post) {
                return next(new Error('No job found.'))
            }
            const invoiceName = 'invoice-' + pstId + '.pdf'
            const invoicePath = path.join('data', 'invoices', invoiceName)
            const pdfDoc = new PDFDocument()
            res.setHeader('Content-Type', 'application/json')
            res.setHeader(
                'Content-Disposition',
                'inline; filename="' + invoiceName + '"'
            )
            pdfDoc.pipe(fs.createWriteStream(invoicePath))
            pdfDoc.pipe(res);
            pdfDoc.fontSize(26).text('Invoice', {
                underline: true
              });
            pdfDoc.text('-----------------------')
            Post.forEach(p => {
                pdfDoc
                    .fontSize(14)
                    .text(
                        p.job
                    )
            })
            pdfDoc.text('---')
            pdfDoc.end()
        })
        .catch(err => next(err))
}
