const {v4 : uuidv4} = require('uuid');
const CartDAOFactory = require('../../daos/factory');

const daoType = process.argv[2];
console.log(daoType)

class CartServices { 
    constructor() {
        const factory = CartDAOFactory.getInstance();
        this.dao = factory.getCartDAO(daoType); // Obtiene el DAO correspondiente
        this.products = [
            {"name":"plátano","description":"fruta amarilla","image":"https://cdn4.iconfinder.com/data/icons/fruits-79/48/15-banana-512.png","price":1500,"stock":100},
            {"name":"palta","description":"fruta verde","image":"https://cdn4.iconfinder.com/data/icons/fruits-79/48/20-avocado-512.png","price":4000,"stock":10},
            {"name":"tomate","description":"fruta roja y deliciosa","image":"https://cdn0.iconfinder.com/data/icons/fruits/512/Tomato.png","price":1500, "stock":100},
            {"name":"helado","description":"Paleta de crema helada","image":"https://cdn4.iconfinder.com/data/icons/summer_klukeart/png/icecream1.png","price":10000,"stock":4},
            {"name":"Manzana","description":"fruta que puede ser verde o roja","image":"https://cdn4.iconfinder.com/data/icons/fruits-79/48/04-apple-512.png","price":670,"stock":16},
            {"name":"Chocolate","description":"alimento delicioso","image":"https://cdn4.iconfinder.com/data/icons/coffee-cafe-brewery-caramel-vol-1/512/CHOCOLATE-512.png","price":2500,"stock":44},
            {"name":"Cebolla","description":"reina de las verduras por su versatilidad","image":"https://cdn3.iconfinder.com/data/icons/healthy-food-9/64/onion-vegetable-healthy-nutritious-512.png","price":500,"stock":135},
            {"name":"Aceitunas","description":"deliciosas frutitas del olivo","image":"https://cdn0.iconfinder.com/data/icons/fruits-and-vegetables-94/512/Olives_Spain_Berries_Tree_Nation_Heritage.png","price":1250,"stock":102}
        ];
        this.callCreateProduct();
    };

    async callCreateProduct () {
        if(this.dao == 'mongo'){
            return
        }
        this.products.forEach(async product => {
            await this.createProduct(product)
        })
    }

    async createCart(userId, productId) {
        const data = {uuid: uuidv4(), user: userId, products : {product: productId}};
        const newCart = await this.dao.create(data);
        return newCart;
    };

    async getCart(userId) {
        const carts = await this.dao.getCart(userId);
        return carts;
    };

    async createProduct(data) {
        data.uuid = uuidv4();
        const newProduct = await this.dao.createProduct(data);
        return newProduct;
    };

    async getProducts() {
        const products = await this.dao.getProducts();
        return products;
      };

    async insertProduct(userId, productId) {
        const cart = await this.dao.insertProduct(userId, productId);
        return cart;
    };

    async deleteProduct(userId, productId) {
        const cart = await this.dao.deleteProduct(userId, productId);
        return cart;
    };

    async deleteCart(userId) {
        const cart = await this.dao.delete(userId);
        return cart;
    };

    static getInstance() {
        if(!instance){
            instance = new CartServices();
        }
        return instance;
    }
};

module.exports = new CartServices();
