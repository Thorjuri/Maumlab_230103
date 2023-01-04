require("dotenv").config();
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

module.exports = async(req, res, next)=> {
    const { authorization } = req.headers;
    const [ authType, authToken ] = (authorization || '').split(' ');

    if (!authToken || authType !== 'Bearer'){
        res.status(401).send({ errorMessage: '로그인이 필요한 기능입니다.' });
        return;
    };

    try {
        const { loginId } = jwt.verify(authToken, `${process.env.SECRET_KEY}`);

        Users.findOne({ where: { loginId } }).then((user)=> {
            if(user){
                res.locals.user = user;
                next();
            }else{
                throw new Error('회원 조회에 실패했습니다. 다시 로그인 해주세요');
            };
            
        });
    } catch(err){
        res.status(400).json({ errorMessage: '로그인이 필요합니다.' });
    };
};
