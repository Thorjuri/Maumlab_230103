const PostsRepository = require('../repositories/postsRepository');

class PostsService {
    postsRepository = new PostsRepository();

};

module.exports = PostsService;