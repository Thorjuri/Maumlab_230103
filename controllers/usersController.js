const UsersService = require('../services/usersService');

class UsersController {
    usersService = new UsersService();

};

module.exports = UsersController;
