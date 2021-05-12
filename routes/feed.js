const express = require('express')

const feedController = require('../controllers/feed')

const router = express.Router()

router.get('/posts', feedController.getPosts)

router.post('/create-post',feedController.createPost)

// router.get('/posts', feedController.getJobs)

router.get('/edit-jobs', feedController.getPosts)

module.exports = router