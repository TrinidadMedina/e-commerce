const messagesContainer = require('../../containers/mongo/mongo.messages.container')

class MessagesServices { 
    constructor() {};

    async createMessage (data) {
        return await messagesContainer.createMessage(data);
    }

    async getMessages() {
        return await messagesContainer.getMessages();
    };

    async getMessage(user) {
        return await messagesContainer.getMessage(user);
    };
};

module.exports = new MessagesServices();
