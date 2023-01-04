const PostsService = require('../services/postsService');

class PostsController {
    postsService = new PostsService();

    createPost = async(req, res)=> {
        const { nickname } = res.locals.user;
        const { title, contents, category } = req.body;
        const data = await this.postsService.createPost(nickname, title, contents, category);
        res.status(201).send(data);
    };

    getAllPost = async(req, res)=> {
        const data = await this.postsService.getAllPost();
        res.status(201).send(data);
    };

    getOnePost = async(req, res)=> {
        const { postId } = req.params;
        const data = await this.postsService.getOnePost(postId);
        res.status(201).send(data);
    };

    searchPost = async(req, res)=> {
        const { keyword } = req.params;
        const data = await this.postsService.searchPost(keyword);
        res.status(201).send(data);
    };

    updatePost = async(req, res)=> {
        const { postId } = req.params;
        const { title, contents, category } = req.body;
        const { nickname } = res.locals.user;
        const data = await this.postsService.updatePost(nickname, postId, title, contents, category);
        res.status(201).send(data);
    };

    deletePost = async(req, res)=> {
        const { postId } = req.params;
        const { nickname } = res.locals.user;
        const data = await this.postsService.deletePost(nickname, postId);
        res.status(201).send(data);
    };

    getMyPost = async(req, res)=> {
        const { nickname } = res.locals.user;
        const data = await this.postsService.getMyPost(nickname);
        res.status(201).send(data);
    };
};

module.exports = PostsController;
