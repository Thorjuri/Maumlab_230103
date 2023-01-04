const UsersRepository = require('../repositories/usersRepository');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UsersService {
    usersRepository = new UsersRepository();
    err = new Error('usersService Error!!')

    signup = async(loginId, password, nickname, email)=> {
        if(!loginId || !password || !nickname){
            this.err.status = 400;
            this.err.message = '필수 입력사항을 모두 입력해주세요.';
            throw this.err;
        };
        const salt = bcrypt.genSaltSync(10);
        const hashedPW = bcrypt.hashSync(password, salt);
        password = hashedPW;
        const data = await this.usersRepository.signup(loginId, password, nickname, email);
        return { loginId: data.loginId, message: `${ data.nickname }님 회원가입을 축하드립니다.`};
    };

    login = async(loginId, password)=> {
        if(!loginId || !password){
            this.err.status = 400;
            this.err.message = '아이디 및 비밀번호를 입력해주세요.';
            throw this.err;
        };
        const user = await this.usersRepository.checkUser(loginId);
        if(!user){
            this.err.status = 403;
            this.err.message = '아이디 또는 패스워드를 확인해주세요';
            throw this.err;
        };
        const checkPass = await bcrypt.compare(password, user.password);
        if(!checkPass){
            this.err.status = 403;
            this.err.message = '아이디 또는 패스워드를 확인해주세요';
            throw this.err;
        };
        const accessToken = jwt.sign({ loginId: user.loginId }, process.env.SECRET_KEY,
            {
                expiresIn: '1d'
            });
        return { loginId: user.loginId, nickname:user.nickname, accessToken: `Bearer ${ accessToken }` };
    };

    checkId = async(loginId)=> {
        if(!loginId){
            this.err.status = 400;
            this.err.message = '아이디를 입력해주세요.';
            throw this.err;
        };
        const data = await this.usersRepository.checkId(loginId);
        if(data){
            return { message : '중복된 아이디 입니다.' };
        }else{
            return { message : '사용 가능한 아이디 입니다.' };
        };
    };

    checkNick = async(nickname)=> {
        if(!nickname){
            this.err.status = 400;
            this.err.message = '닉네임을 입력해주세요.';
            throw this.err;
        };
        const data = await this.usersRepository.checkNick(nickname);
        if(data){
            return { message : '중복된 닉네임 입니다.' };
        }else{
            return { message : '사용 가능한 닉네임 입니다.' };
        };
    };

    updateInfo = async(loginId, nickname, email)=> {
        const user = await this.usersRepository.checkUser(loginId);
        if(!nickname && email){
            nickname = user.nickname;  
        }else if(!email && nickname){
            email = null;
        }else if(!nickname && !email){
            this.err.status = 400;
            this.err.message = '닉네임과 이메일 중 한 가지는 필수 입력 사항입니다.';
            throw this.err;
        };
        //닉네임 중복확인 기존 API 이용 가정
        const data = await this.usersRepository.updateInfo(loginId, nickname, email);
        return { data, message: '회원정보가 수정되었습니다.' };
    };

    dropUser = async(loginId, password)=> {
        const user = await this.usersRepository.checkUser(loginId);
        const checkPass = await bcrypt.compare(password, user.password);
        if(!checkPass){
            this.err.status = 403;
            this.err.message = '패스워드가 올바르지 않습니다.';
            throw this.err;
        };
        const data = await this.usersRepository.dropUser(loginId);
        return { message: '정상적으로 탈퇴 되었습니다. 이용해주셔서 감사합니다.' };
    };
};

module.exports = UsersService;