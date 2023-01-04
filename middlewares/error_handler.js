module.exports = (err, req, res, next)=> {
    console.log(err);
    if (err.status === undefined) {  //예외처리 되지 않은 에러 반환
        if(err.name.indexOf('Sequelize') >= 0){  //(1)DB Sequelize Error
            res.status(500).json({  
                name: err.name,
                status: 500,
                errorMessage: err.original.sqlMessage
            });
        }else {
            res.status(500).json({  //(2)그 외 명시되지 않은 모든 에러
                name: err.name,
                status: 500,
                errorMessage: err.original.sqlMessage,
                Request: {
                    header: req.headers,
                    params: req.params,
                    body: req.body,
                },
                errorStack: err.stack,
            });
        };
    }else{
        res.status(err.status).json({  //예외처리 된 에러 반환
            type: err.name,
            status: err.status,
            error: err.message,
        });
    };
};
