const commentsRouter = require('express').Router()
const Comment = require('../models/comment')

commentsRouter.get('/:blogId/comments', async (request, response) => {
  let comments = await Comment.find({})
  response
    .status(200)
    .json({ comments: comments, blogId: request.params.blogId })
})

commentsRouter.post('/:blogId/comments', async (request, response) => {
  const body = request.body
  let newComment = new Comment({
    content: body.content,
  })
  let savedNewComment = await newComment.save()
  response.status(200).json(savedNewComment)
})

module.exports = commentsRouter
