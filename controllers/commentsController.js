const CommentsService = require('../services/commentsService');

class CommentsController {
    commentsService = new CommentsService();

    createCmt = async(req, res)=> {
        const { nickname } = res.locals.user;
        const { postId, comment } = req.body;
        const data = await this.commentsService.createCmt(nickname, postId, comment);
        res.status(201).send(data);
    };

    getAllCmts = async(req, res)=> {
        const { postId } = req.params;
        const data = await this.commentsService.getAllCmts(postId);
        res.status(201).send(data);
    };

    createReply = async(req, res)=> {
        const { nickname } = res.locals.user;
        const { postId, commentId, reply } = req.body;
        const data = await this.commentsService.createReply(nickname, postId, commentId, reply);
        res.status(201).send(data);
    };
};

module.exports = CommentsController;
