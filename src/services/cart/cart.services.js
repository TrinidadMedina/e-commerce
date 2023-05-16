const {v4 : uuidv4} = require('uuid');
const CartDAOFactory = require('../../daos/cart/cart.factory');

const daoType = process.argv[2] || 'mongo';

const memoryProducts = [
    {"name":"plátano","description":"fruta amarilla","category":"comida","image":"https://cdn4.iconfinder.com/data/icons/fruits-79/48/15-banana-512.png","price":1500,"stock":100},
    {"name":"palta","description":"fruta verde", "category":"comida", "image":"https://cdn4.iconfinder.com/data/icons/fruits-79/48/20-avocado-512.png","price":4000,"stock":10},
    {"name":"tomate","description":"fruta roja y deliciosa", "category":"comida", "image":"https://cdn0.iconfinder.com/data/icons/fruits/512/Tomato.png","price":1500, "stock":100},
    {"name":"helado","description":"Paleta de crema helada", "category":"comida", "image":"https://cdn4.iconfinder.com/data/icons/summer_klukeart/png/icecream1.png","price":10000,"stock":4},
    {"name":"Manzana","description":"fruta que puede ser verde o roja", "category":"comida", "image":"https://cdn4.iconfinder.com/data/icons/fruits-79/48/04-apple-512.png","price":670,"stock":16},
    {"name":"Chocolate","description":"alimento delicioso", "category":"comida", "image":"https://cdn4.iconfinder.com/data/icons/coffee-cafe-brewery-caramel-vol-1/512/CHOCOLATE-512.png","price":2500,"stock":44},
    {"name":"Cebolla","description":"reina de las verduras por su versatilidad", "category":"comida", "image":"https://cdn3.iconfinder.com/data/icons/healthy-food-9/64/onion-vegetable-healthy-nutritious-512.png","price":500,"stock":135},
    {"name":"Aceitunas","description":"deliciosas frutitas del olivo", "category":"comida", "image":"https://cdn0.iconfinder.com/data/icons/fruits-and-vegetables-94/512/Olives_Spain_Berries_Tree_Nation_Heritage.png","price":1250,"stock":102},
    {"name":"Tetera","category":"utensilio","description":"hervidor de agua","image":"https://cdn4.iconfinder.com/data/icons/kitchen-utencils/78/Kitchen_tools_utencils_kettle-256.png","price":10350,"stock":15},
    {"name":"Microondas","category":"electrodoméstico","description":"para calentar rápido la comida","image":"https://cdn0.iconfinder.com/data/icons/home-appliances-46/145/27-64.png","price":20990, "stock":23},
    {"name":"Lavadora","category":"electrodoméstico","description":"máquina lavarropa","image":"https://cdn0.iconfinder.com/data/icons/home-electronics-1/64/washingmachine-electric-home-64.png","price":52000,"stock":20},
    {"name":"Tostador","category":"electrodoméstico","description":"artefacto para tostar pan","image":"https://cdn0.iconfinder.com/data/icons/home-appliances-46/145/39-512.png","price":5200,"stock":44},
    {"name":"Colador","category":"utensilio","description":"para quitarle el agua a ls cosas","image":"https://cdn2.iconfinder.com/data/icons/julia-s-kitchen/128/strainer-64.png","price":4500,"stock":66},
    {"name":"Uslero","category":"utensilio","description":"palo para amasar","image":"https://cdn4.iconfinder.com/data/icons/food-4-9/128/food_Rolling-Pin-Kitchen-Tool-Utensil-512.png","price":4700,"stock":36 },
    {"name":"Cucharón","category":"utensilio","description":"cuchara grande","image":"https://cdn3.iconfinder.com/data/icons/kitchen-utensils-colored/64/ladle-512.png","price":3990,"stock":32}
];

class CartServices { 
    constructor() {
        const factory = CartDAOFactory.getInstance();
        this.dao = factory.getCartDAO(daoType);
        this.products = memoryProducts;
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

    async createCart(userEmail, productUuid) {
        const data = {uuid: uuidv4(), user: userEmail, products: productUuid};
        const newCart = await this.dao.create(data);
        
        return newCart;
    };

    async getCart(userEmail) {
        const cart = await this.dao.getCart(userEmail);
        return cart;
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

    async getProductsCategory(category) {
        const products = await this.dao.getProductsCategory(category);
        return products;
    }

    async insertProduct(userEmail, productUuid) {
        const cart = await this.dao.insertProduct(userEmail, productUuid);
        return cart;
    };

    async deleteProduct(userEmail, productUuid) {
        const cart = await this.dao.deleteProduct(userEmail, productUuid);
        return cart;
    };

    async deleteCart(userEmail) {
        const cart = await this.dao.delete(userEmail);
        return cart;
    };
};

module.exports = new CartServices();
