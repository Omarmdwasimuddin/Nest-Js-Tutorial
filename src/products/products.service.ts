import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/products.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
    ) {}

    async createProducts(): Promise<Product> {
        const product = new this.productModel({
            title: 'Gaming Laptop',
            tag: [
                { name: 'Electronics' },
                { name: 'Laptop' },
                { name: 'Gaming' },
            ],
        });
        return product.save();
    }

    async getProducts(): Promise<Product[]> {
        return this.productModel.find().exec();
    }
}
