const express = require("express");
const router = express.Router();
const auth_middleware = require("../middlewares/auth_middleware");
const CommentsController = require("../controllers/commentsController");
const commentsController = new CommentsController();
const wrapAsyncController = require('../middlewares/wrapAsyncController');

router.post('/:postId', auth_middleware, wrapAsyncController(commentsController.createCmt)); //댓글 작성
router.post('/:postId/:commentId', auth_middleware, wrapAsyncController(commentsController.createReply)); //대댓글 작성
router.delete('/:postId/:commentId', auth_middleware, wrapAsyncController(commentsController.deleteCmt)); //댓글 삭제
router.delete('/:postId/:originCmtId/:commentId', auth_middleware, wrapAsyncController(commentsController.deleteReply)); //대댓글 삭제

module.exports = router;