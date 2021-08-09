const express = require('express')

const feedController = require('../controllers/feed')

const router = express.Router()

router.get('/posts', feedController.getPosts)

router.post('/create-post',feedController.createPost)

router.get('/edit-jobs/:id', feedController.getEditPost)

router.post('/edit-jobs', feedController.postEditPost)

router.delete('/post/:id', feedController.deletePost)

module.exports = router