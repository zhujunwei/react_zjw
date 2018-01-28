/**
 * 日志报错打印
 */
function errorHandler(){
    var env = process.env.NODE_ENV || 'test';
    
    return function(err,req,res,next){
        console.log('err:',err)
        res.statusCode = err.statusCode || 500;
        switch(env){
            case 'test':
                console.log(222)
                res.json(err);
                break;
            default:
                res.json({code:500,data:'系统错误'});
                break;    
        }
    }
}

module.exports = errorHandler;