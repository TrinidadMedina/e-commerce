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
            console.error(err);
            throw new Error(err);
        }
    };

    async getMessages() {
        try{
            const messages = await messageModel.find().
            populate('user');
            if(messages.length === 0){
                return null
            }
            return messages
        }catch(err){
            console.error(err);
            throw new Error(err);
        }   
    };

    async getMessage(user) {
        try{
            const user = await userModel.findOne({email: user});
            const messages = await messageModel.find({user: user._id}).populate('user');
/*             const messages = await messageModel.find().
            populate({
                path: 'userModel',
                select: '-_id, name'
            }); */
            if(messages.length === 0){
                return null
            }
            return messages
        }catch(err){
            console.error(err);
            throw new Error(err);
        }   
    };
}

module.exports = new MessagesContainer();