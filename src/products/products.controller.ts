import { Controller, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Post()
  addProduct(): any {}
}
