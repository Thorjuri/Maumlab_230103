const CommentsRepository = require('../repositories/commentsRepository');

class CommentsService {
    commentsRepository = new CommentsRepository();
    err = new Error('CommentsService Error!!');

    createCmt = async(nickname, postId, comment)=> {
        const post = await this.commentsRepository.checkPost(postId);
        if(!post){
            this.err.status = 400;
            this.err.message = '해당 게시글이 존재하지 않습니다.';
            throw this.err;
        };
        if(!comment){
            this.err.status = 400;
            this.err.message = '댓글 내용을 입력해주세요.';
            throw this.err;
        };
        if(comment.length > 70){
            this.err.status = 400;
            this.err.message = '댓글은 70자 이하로 작성해주세요.';
            throw this.err;
        };

        const data = await this.commentsRepository.createCmt(nickname, postId, comment);
        return { data, message: "댓글 작성 완료"};
    };

    getAllCmts = async(postId)=> {
        const comments = await this.commentsRepository.getAllCmts(postId);
        const result = await Promise.all(comments.map(async(val)=> {
            const replies = await this.commentsRepository.getAllReply(val.commentId);
            const reply = replies.map((val)=> {
                return val.reply;
            });
            return { commentId: val.commentId, comment:val.comment, reply: reply };
        }));
        if(result.length === 0){
            return { message: "해당 게시글에 댓글이 존재하지 않습니다."}
        }else{
            return result;
        };
    };

    createReply = async(nickname, postId, commentId, reply)=> {
        const post = await this.commentsRepository.checkPost(postId);
        const comment = await this.commentsRepository.checkCmt(commentId);
        if(!post){
            this.err.status = 400;
            this.err.message = '해당 게시글이 존재하지 않습니다.';
            throw this.err;
        };
        if(!comment){
            this.err.status = 400;
            this.err.message = '기존 댓글이 존재하지 않습니다.';
            throw this.err;
        };
        if(!reply || reply.length > 50){
            this.err.status = 400;
            this.err.message = '대댓글을 50자 이하로 작성해주세요';
            throw this.err;
        };
        const data = await this.commentsRepository.createReply(nickname, postId, commentId, reply);
        return { data, message: "대댓글 작성 완료"};
    };
};

module.exports = CommentsService;