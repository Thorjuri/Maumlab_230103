const CommentsService = require('../services/commentsService');

class CommentsController {
    commentsService = new CommentsService();

};

module.exports = CommentsController;
