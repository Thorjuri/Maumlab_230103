const { Users, Posts, Comments } = require('../models');
const { Op } = require("sequelize");

class PostsRepository {

    createPost = async(nickname, title, contents, category)=> {
        const data = await Posts.create({ nickname, title, contents, category });
        return data;
    };

    getAllPost = async()=> {
        const data = await Posts.findAll({ raw: true });
        return data;
    };

    getOnePost = async(postId)=> {
        const data = await Posts.findOne({ where: { postId } });
        return data;
    };

    searchPost = async(keyword)=> {
        const data = await Posts.findAll({
            raw: true,
            where: {
                [Op.or]: [
                    {
                        title: {
                        [Op.like]: `%${ keyword }%`,
                        },
                    },
                    {
                        contents: {
                        [Op.like]: `%${ keyword }%`,
                        },
                    },
                ],
            },
        });
        return data;
    };

    updatePost = async(nickname, postId, title, contents, category)=> {
        const data = await Posts.update({
            title, contents, category
        },{
            where: { nickname, postId }
        });
        return data;
    };

    deletePost = async(nickname, postId)=> {
        const data = await Posts.destroy({ where: { nickname, postId } });
        return data;
    };

    getMyPost = async(nickname)=> {
        const data = await Posts.findAll({ 
            raw: true,
            where: { nickname } 
        });
        return data;
    };
};

module.exports = PostsRepository;