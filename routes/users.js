const express = require("express");
const router = express.Router();
const auth_middleware = require("../middlewares/auth_middleware");
const UsersController = require("../controllers/usersController");
const usersController = new UsersController();
const wrapAsyncController = require('../middlewares/wrapAsyncController');

router.post('/signup', wrapAsyncController(usersController.signup)); //회원가입
router.post('/login', wrapAsyncController(usersController.login)); //로그인
router.post('/checkid', wrapAsyncController(usersController.checkId)); //ID 중복확인
router.patch('/', auth_middleware, wrapAsyncController(usersController.updateInfo));
router.delete('/',auth_middleware,  wrapAsyncController(usersController.dropUser));

module.exports = router;