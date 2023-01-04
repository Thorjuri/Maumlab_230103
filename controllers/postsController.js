const PostsService = require('../services/postsService');

class PostsController {
    postsService = new PostsService();

};

module.exports = PostsController;
