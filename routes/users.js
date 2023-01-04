const express = require("express");
const router = express.Router();
const auth_middleware = require("../middlewares/auth_middleware");
const UsersController = require("../controllers/usersController");
const usersController = new UsersController();
const {user_singup} = require('../middlewares/user_validation');
const wrapAsyncController = require('../middlewares/wrapAsyncController');

router.post('/signup', user_singup,  wrapAsyncController(usersController.signup)); //회원가입
router.post('/login', wrapAsyncController(usersController.login)); //로그인
router.post('/checkid', wrapAsyncController(usersController.checkId)); //ID 중복확인
router.post('/checknick', wrapAsyncController(usersController.checkNick)); //닉네임 중복확인
router.patch('/', auth_middleware, wrapAsyncController(usersController.updateInfo)); //회원정보 수정
router.delete('/',auth_middleware,  wrapAsyncController(usersController.dropUser)); //회원탈퇴

module.exports = router;