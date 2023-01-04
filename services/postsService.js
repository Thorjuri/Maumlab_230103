const PostsRepository = require('../repositories/postsRepository');

class PostsService {
    postsRepository = new PostsRepository();
    err = new Error('PostsService Error!!');

    checkSpecial = async(str)=> { 
        const regExp = /[^\w\sㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9!?~.,]/g; 
        if(regExp.test(str)) {
            return true;
        }else{
            return false;
        };
    };

    createPost = async(nickname, title, contents, category)=> {
        const checktitle = await this.checkSpecial(title);
        const categories = ["가입인사", "중고장터", "질의응답", "이모저모"];
        if(!title || !contents || !category){
            this.err.status = 400;
            this.err.message = '필수 항목을 모두 작성해 주세요.';
            throw this.err;
        };
        if(checktitle){
            this.err.status = 400;
            this.err.message = '제목은 한글, 영문, 숫자, 특수문자(? ! ~ , .)만 가능합니다.';
            throw this.err;
        };
        if(contents.length < 10){
            this.err.status = 400;
            this.err.message = '본문은 10자 이상이어야 합니다.';
            throw this.err;
        };
        if(!categories.includes(category)){
            this.err.status = 400;
            this.err.message = '카테코리는 [ 가입인사, 중고장터, 질의응답, 이모저모 ] 중 선택해주세요.';
            throw this.err;
        };

        const data = await this.postsRepository.createPost(nickname, title, contents, category);
        return { data, message: "게시글이 등록되었습니다."};
    };

    getAllPost = async()=> {
        const data = await this.postsRepository.getAllPost();
        if(!data){
            return { message: "게시글이 존재하지 않습니다."};
        }else{
            return { data, message: `조회된 게시글 ${ data.length }건` };
        };
    };

    getOnePost = async(postId)=> {
        const data = await this.postsRepository.getOnePost(postId);
        if(!data){
        return { message: `${ postId }번 게시글이 존재하지 않습니다.` };
        }else{
        return { data };
        };
    };

    searchPost = async(keyword)=> {
        const checkKeyword = await this.checkSpecial(keyword)
        if(keyword.split(" ").length >= 2){
            this.err.status = 400;
            this.err.message = '검색어에 공백은 포함 할 수 없습니다.';
            throw this.err;
        };
        if(checkKeyword){
            this.err.status = 400;
            this.err.message = '검색어에 한글, 영문, 숫자, 특수문자(? ! ~ , .)외 문자는 포함할 수 없습니다..';
            throw this.err;
        };
        
        const data = await this.postsRepository.searchPost(keyword);
        return { data, message: `조회된 게시글 총 ${ data.length }건` };
    };

    updatePost = async(nickname, postId, title, contents, category)=> {
        const post = await this.postsRepository.getOnePost(postId);
        const checktitle = await this.checkSpecial(title);
        const categories = ["가입인사", "중고장터", "질의응답", "이모저모"];
        if(!post){
            this.err.status = 400;
            this.err.message = '해당 게시글이 존재하지 않습니다.';
            throw this.err;
        };
        if(post.nickname != nickname){
            this.err.status = 400;
            this.err.message = '게시글 수정 권한이 없습니다. 본인의 게시글만 수정 가능합니다.';
            throw this.err;
        };
        title = title || post.title;
        contents = contents || post.contents;
        category = category || post.category;

        if(checktitle){
            this.err.status = 400;
            this.err.message = '제목은 한글, 영문, 숫자, 특수문자(? ! ~ , .)만 가능합니다.';
            throw this.err;
        };
        if(contents.length < 10){
            this.err.status = 400;
            this.err.message = '본문은 10자 이상이어야 합니다.';
            throw this.err;
        };
        
        if(!categories.includes(category)){
            this.err.status = 400;
            this.err.message = '카테코리는 [ 가입인사, 중고장터, 질의응답, 이모저모 ] 중 선택해주세요.';
            throw this.err;
        };

        const data = await this.postsRepository.updatePost(nickname, postId, title, contents, category);
        return { data, message: '게시글이 수정되었습니다.' };
    };

    deletePost = async(nickname, postId)=> {
        const post = await this.postsRepository.getOnePost(postId);
        if(!post){
            this.err.status = 400;
            this.err.message = '해당 게시글이 존재하지 않습니다.';
            throw this.err;
        };
        if(post.nickname != nickname){
            this.err.status = 400;
            this.err.message = '게시글 삭제 권한이 없습니다. 본인의 게시글만 삭제 가능합니다.';
            throw this.err;
        };
        const data = await this.postsRepository.deletePost(nickname, postId);
        return { data, message: '게시글이 삭제 되었습니다.' };
    };

    getMyPost = async(nickname)=> {
        const data = await this.postsRepository.getMyPost(nickname);
        if(!data){
            return { message: '게시글이 존재하지 않습니다.' };
        }else{
            return { data, message: `조회된 나의 게시글 총 ${ data.length }건` }
        };
    };
};

module.exports = PostsService;