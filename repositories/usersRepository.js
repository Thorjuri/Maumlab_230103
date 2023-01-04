const { Users, Posts, Comments } = require('../models');

class UsersRepository {

    checkUser = async(loginId)=> {
        const data = await Users.findOne({ where: { loginId } });
        return data;
    };

    signup = async(loginId, password, nickname, email)=> {
        const data = await Users.create({ loginId, password, nickname, email });
        return data;
    };

    checkId = async(loginId)=> {
        const data = await Users.findOne({ where: { loginId }});
        return data;
    };

    checkNick = async(nickname)=> {
        const data = await Users.findOne({ where: { nickname }});
        return data;
    };

    updateInfo = async(loginId, nickname, email)=> {
        const data = await Users.update({
            nickname, email
        },{
            where: { loginId }
        });
        return data;
    };

    dropUser = async(loginId)=> {
        await Users.destroy({ where: { loginId } });
        return;
    };
};

module.exports = UsersRepository;