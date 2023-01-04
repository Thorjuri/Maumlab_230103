const express = require("express");
const router = express.Router();
const auth_middleware = require("../middlewares/auth_middleware");
const PostsController = require("../controllers/postsController");
const postsController = new PostsController();
const wrapAsyncController = require('../middlewares/wrapAsyncController');

router.post('/', auth_middleware, wrapAsyncController(postsController.createPost)); //게시글 작성
router.get('/', wrapAsyncController(postsController.getAllPost)); //게시글 목록 조회
router.get('/:postId', auth_middleware, wrapAsyncController(postsController.getOnePost)); //게시글 상세 조회
router.get('/:keyword', wrapAsyncController(postsController.searchPost)); //게시글 검색
router.patch('/:postId', auth_middleware, wrapAsyncController(postsController.updatePost)); //게시글 수정
router.delete('/:postId', auth_middleware, wrapAsyncController(postsController.deletePost)); //게시글 삭제
router.patch('/me', auth_middleware, wrapAsyncController(postsController.getMyPost)); //내가 쓴 글 조회

module.exports = router;