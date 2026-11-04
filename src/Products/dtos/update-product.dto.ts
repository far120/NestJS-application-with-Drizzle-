import { IsInt, IsNumber, IsString, Matches } from "class-validator";

export class updateProductDto {
  @IsString({ message: 'Title must be a string' })
  title?: string;

  @IsString({ message: 'Description must be a string' })
  description?: string;

 @IsString({ message: 'Price must be a string' })
price?: string;

  @IsInt({ message: 'Stock must be an integer' })
  stock?: number;

   @IsInt({ message: 'Seller ID must be an integer' })
  sellerId?: number;
}