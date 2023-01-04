const { Users, Posts, Comments, Replies } = require('../models');

class CommentsRepository {

    checkPost = async(postId)=> {
        const data = await Posts.findOne({ where: { postId } });
        return data;
    };
    
    createCmt = async(nickname, postId, comment)=> {
        const data = await Comments.create({ nickname, postId, comment });
        return data;
    };
    
    getAllCmts = async(postId)=> {
        const data = await Comments.findAll({
            raw: true,
            where: { postId }
        });
        return data;
    };
    
    checkCmt = async(commentId)=> {
        const data = await Comments.findOne({ where: { commentId } });
        return data;
    };
    
    createReply = async(nickname, postId, commentId, reply)=> {
        const data = await Replies.create({ nickname, postId, commentId, reply });
        return data;
    };

    getAllReply = async(commentId)=> {
        const data = await Replies.findAll({ 
            raw: true,
            where : { commentId },
            attributes : ['reply']
        });
        return data;
    };
};

module.exports = CommentsRepository;