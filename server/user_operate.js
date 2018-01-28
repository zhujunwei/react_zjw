
const models = require('./model');
const userToken = models.getModel('user_token');

//检验token
function checkAuthorization(auth,next){
    userToken.findOne({access_token:auth},function(err,doc){
        if(err) return next(new UnauthorizedAccessError(ValidationError.code.token.tokenNotFound , 'User Unauthorized, token not found', 'username'))
        console.log(doc)
        if(doc){
            var accessTime = doc.token_effective;
            if((new Date() - new Date(accessTime)) > 0){
                next({
                    code:403,
                    err:'用户过期'
                })
            }else{
                next();
            }
        }else{
            next({
                code:403,
                err:'用户过期'
            })
        }
    })
}

module.exports = {
    checkAuthorization:checkAuthorization
}