const Joi = require("joi");

const user_validation = { 
	user_singup : async (req, res, next) =>{ 
        const body = req.body; 
        const schema = Joi.object().keys({ 
            loginId: Joi.string().min(5).max(11).required(),
            nickname: Joi.string().required()
                        .pattern(new RegExp('^[a-zA-Z0-9]{4,20}$')), 
            password: Joi.string()
                        .pattern(new RegExp('^[a-zA-Z0-9]{5,20}$')),
            confirmPass: Joi.ref('password'), 
            email: Joi.string().email(), 
        }); 
    
    try { 
        await schema.validateAsync(body);
        next() 
    } catch(err) { 
        err.status = 401;
        next(err); 
        };
    }
}; 
    module.exports = user_validation;
