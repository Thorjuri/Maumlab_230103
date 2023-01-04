const CommentsRepository = require('../repositories/commentsRepository');

class CommentsService {
    commentsRepository = new CommentsRepository();

};

module.exports = CommentsService;