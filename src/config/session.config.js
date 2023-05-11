const getMongoConfig = () => {
    return {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
};

const getStoreConfig = () => {
    const MONGO_URI = process.env.MONGO_URI;
    return {
        mongoUrl: MONGO_URI,
        ttl: 300,
        mongoOptions: getMongoConfig()
    }
};

module.exports = {
    getMongoConfig,
    getStoreConfig
}