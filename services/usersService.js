const UsersRepository = require('../repositories/usersRepository');

class UsersService {
    usersRepository = new UsersRepository();

};

module.exports = UsersService;