import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DATABASE } from "../database/database.provider.js";
import type { Database } from "../database/database.provider.js";
import { products } from "../database/schema/product.schema.js";
import { eq } from "drizzle-orm";
import { CreateProductDto } from "./dtos/create-product.dto.js";
import { updateProductDto } from "./dtos/update-product.dto.js";

@Injectable()
export class ProductsService {
  constructor(@Inject(DATABASE)private readonly db: Database) {}

  public async getAllProducts() {
    return await this.db.query.products.findMany({
      with: {
        seller: true,
      },
    });
  }

  public async getProductById(id: number) {
    const product = await this.db.query.products.findFirst({
      where: eq(products.id, id),
      with: {
        seller: true,
      },
    });
    if (!product)
       throw new NotFoundException(`Product with ID ${id} not found`);
    return {message:"Product found successfully", product};
  }

  public async createProduct(product: CreateProductDto) {
    const [newproduct] = await this.db.insert(products).values(product).returning();
    if (!newproduct)
       throw new BadRequestException("Failed to create product");
      return {message:"Product created successfully", newproduct};
  }

  public async updateProduct(id: number, product: updateProductDto) {
    const [newproduct] = await this.db.update(products).set(product).where(eq(products.id, id)).returning();
    if (!newproduct)
       throw new BadRequestException("Failed to update product");
    return {message:"Product updated successfully", newproduct};
  }


  public async deleteProduct(id: number) {
    const[product] = await this.db.delete(products).where(eq(products.id, id)).returning();
    if (!product)
       throw new BadRequestException("Failed to delete product");
    return {message:"Product deleted successfully", product};
  }

}