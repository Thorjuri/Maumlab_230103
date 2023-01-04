const UsersService = require('../services/usersService');

class UsersController {
    usersService = new UsersService();

    signup = async(req, res)=> {
        const { loginId, password, nickname, email } = req.body;
        const data = await this.usersService.signup(loginId, password, nickname, email);
        res.status(201).send(data);
    };

    login = async(req, res)=> {
        const { loginId, password } = req.body;
        const data = await this.usersService.login(loginId, password);
        res.status(201).send(data);
    };

    checkId = async(req, res)=> {
        const { loginId } = req.body;
        const data = await this.usersService.checkId(loginId);
        res.status(200).send(data);
    };

    checkNick = async(req, res)=> {
        const { nickname } = req.body;
        const data = await this.usersService.checkNick(nickname);
        res.status(200).send(data);
    };

    updateInfo = async(req, res)=> {
        const { loginId } = res.locals.user
        const { nickname, email } = req.body;
        const data = await this.usersService.updateInfo(loginId, nickname, email);
        res.status(201).send(data)
    };

    dropUser = async(req, res)=> {
        const { loginId } = res.locals.user;
        const { password } = req.body;
        const data = await this.usersService.dropUser(loginId, password);
        res.status(201).send(data)
    };
};

module.exports = UsersController;
