const express = require("express");
const router = express.Router();
const auth_middleware = require("../middlewares/auth_middleware");
const CommentsController = require("../controllers/commentsController");
const commentsController = new CommentsController();
const wrapAsyncController = require('../middlewares/wrapAsyncController');

router.post('/', auth_middleware, wrapAsyncController(commentsController.createCmt)); //댓글 작성
router.post('/reply', auth_middleware, wrapAsyncController(commentsController.createReply)); //대댓글 작성
router.get('/:postId', auth_middleware, wrapAsyncController(commentsController.getAllCmts)); //댓글,대댓글 조회

module.exports = router;