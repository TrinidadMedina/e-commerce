const userModel = require('./models/mongo.user.model');
const messageModel = require('./models/mongo.messages.model');

class MessagesContainer{
    constructor(){}

    async createMessage(data) {
        try{
            const user = await userModel.findOne({email: data.email});
            data.user = user._id;
            const message = await messageModel.create(data);
            return message;
        }catch(err){
            throw new Error(err);
        }
    };

    async getMessages() {
        try{
            const messages = await messageModel.find()
            .populate('user');
            
            if(messages.length === 0){
                return null
            }
            return messages
        }catch(err){
            throw new Error(err);
        }   
    };

    async getMessage(email) {
        try{
            const user = await userModel.findOne({email: email});
            const messages = await messageModel.find({user: user._id}).populate('user');
            if(messages.length === 0){
                return null
            }
            return messages
        }catch(err){
            throw new Error(err);
        }   
    };
}

module.exports = new MessagesContainer();