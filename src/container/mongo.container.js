const _ = require('lodash')

class MongoContainer {

    constructor(model, productModel) {
        this.model = model;
        this.productModel = productModel;
    };

    async create(data) {
        try{
            const cart = await this.model.findOne({user: data.user});
            if(!cart){
                return await this.model.create(data);
            }
            const prod = cart.products.filter(prod => prod.product == data.products.product[0]);

            if(!_.isEmpty(prod)){
                  return 'Producto ya existe en tu carro'
            }else{
                //console.log(data.user, data.products.product)
                await this.model.updateOne({_id: cart._id}, { $push: {products: { product: data.products.product[0] }} });
                return
            }
        }catch(err){
            throw new Error(err.message);
        }
    };

    async createProduct(data) {
        try{
            const product = await this.model.findOne({name: data.name});
            if(product){
                return 'Producto ya existe en el catálogo'
            }
            return await this.model.create(data);
        }catch(err){

        }
    }

    async getAll(userId) {
        try{
            if(this.productModel === undefined){
                return await this.model.find();
            } 
            const cart = await this.model.findOne({user: userId}).populate('products.product');
            return [cart]
        }catch(err){
            throw new Error(err.message);
        }   
    };

    async getOne(id) {
        try{
            const item = await this.model.findOne({_id: id});
            if (!item){
                return null
            }
            if(item.products){
                return item.populate('products.product');
            }
            return item
        }catch(err){
            throw new Error(err.message);
        }   
    };

    async delete(uuid) {
        try{
            let data = await this.model.deleteOne({uuid: uuid});
            return data.deletedCount === 0 ? null : data;
        }catch(err){
            throw new Error(err);
        }
    };

    async insertProduct(userId, productId) {
        try{ 
            const cart = await this.model.findOne({user: userId});
            const prod = cart.products.filter(prod => prod.product == productId[0]);
            const updated = await this.model.findOneAndUpdate(
                { _id: cart._id, "products._id": prod[0]._id }, // criterio de búsqueda
                { $set: { "products.$.quant": prod[0].quant+1 } }, // actualización
            );
            return 'Producto agregado'
        }catch(err){
            console.log(err);
        }
    };

    async deleteProduct(userId, productId) {
        try{
            const cart = await this.model.findOne({user: userId});
            const prod = cart.products.filter(prod => prod.product == productId[0]);
            if(prod[0].quant == 1){
                const updated = await this.model.updateOne({_id: cart._id}, { $pull: {products: { product: productId[0] }} });
                return
            }
            const updated = await this.model.findOneAndUpdate(
                { _id: cart._id, "products._id": prod[0]._id }, // criterio de búsqueda
                { $set: { "products.$.quant": prod[0].quant-1 } }, // actualización
                { new: true } // opción para devolver el documento actualizado
            );
            
            return 'Producto eliminado'
        }catch(err){
            throw new Error(err);
        }
    };
}

module.exports = MongoContainer;