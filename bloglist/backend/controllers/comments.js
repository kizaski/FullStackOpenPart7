const commentsRouter = require('express').Router()
const Comment = require('../models/comment')

commentsRouter.get('/:blogId/comments', async (request, response) => {
  let blogId = request.params.blogId
  let comments = await Comment.find({ blog: blogId })
  response.status(200).json(comments)
})

commentsRouter.post('/:blogId/comments', async (request, response) => {
  let blogId = request.params.blogId
  let newComment = new Comment({
    content: request.body.content,
    blog: blogId,
  })
  let savedNewComment = await newComment.save()
  response.status(201).json(savedNewComment)
})

// commentsRouter.delete('/comments/deleteall', async (request, response) => {
//   await Comment.deleteMany({})
//   response.status(200).json()
// })

commentsRouter.delete('/comments/:commentId', async (request, response) => {
  let commentId = request.params.commentId
  await Comment.findByIdAndDelete(commentId)
  response.status(200).json()
})

module.exports = commentsRouter
