import { Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Post()
    createProducts() {
        return this.productsService.createProducts();
    }

    @Get()
    getProducts() {
        return this.productsService.getProducts();
    }
}
