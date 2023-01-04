const wrapAsyncController = (fn) => {  //예외처리 여부 관계없이 모든 Error wrapping, 일괄 반환
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
module.exports = wrapAsyncController;