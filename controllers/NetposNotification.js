const NetPosNotification = require("../models").NetPos;


module.exports.createTransaction = (request, response, next) => {
    if (request.body == null) {
        return response.status(400).json({
            "message": "Invalid data supplied as input."
        });
    }
    NetPosNotification.create({...request.body}).then((res) => {
        return response.status(200).json({
            "message": "Transaction successfully saved."
        });
    }).catch(err => err);
    
};
