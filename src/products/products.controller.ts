import { ProductsService } from './products.service';
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('amount') prodPrice: number,
  ) {
    const generatedId = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products
  }

  @Get(':id')
 getProduct(@Param('id') prodId: string) {
  
     return this.productsService.getProduct(prodId);
      
  }

  @Put(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('amount') prodPrice: number,
  ) {
    const res = await this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );

    return res
  }

  @Delete(':id')
  async deleteProduct(@Param('id') prodId: string){
      await this.productsService.deleteProduct(prodId)
      return null
  }
}
