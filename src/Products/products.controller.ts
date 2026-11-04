import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductsService } from "./products.service.js";
import { CreateProductDto } from "./dtos/create-product.dto.js";
import { updateProductDto } from "./dtos/update-product.dto.js";

@Controller()
export class ProductsController {

    constructor(private readonly products: ProductsService){}

    @Get("/api/products")
    async getAllProducts(){
        return await this.products.getAllProducts();
    }

    @Get("/api/products/:id")
    async getProductById(@Param('id') id: number){
        return await this.products.getProductById(id);
    }

    @Post("/api/products")
    async createProduct(@Body() product:CreateProductDto){
        return await this.products.createProduct(product);
    }

    @Put("/api/products/:id")
    async updateProduct(@Param('id') id: number, @Body() product:updateProductDto){
        return await this.products.updateProduct(id,product);
    }

    @Delete("/api/products/:id")
    async deleteProduct(@Param('id') id: number){
        return await this.products.deleteProduct(id);
    }




}