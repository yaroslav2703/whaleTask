const tcpp = require('tcp-ping');


module.exports = async (req, res) => {
    try{
        await tcpp.ping({
            address: 'google.com'
        }, function(err, data) {
            if(err){
                console.log(err);
                res.status(400).json({message: 'Что-то пошло не так, попробуйте снова'})
            }
            res.json({latency: data})
        });
    }catch (e) {
        await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};