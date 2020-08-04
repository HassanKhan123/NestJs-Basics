import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  insertProduct(title: string, description: string, amount: number) {
    const newProduct = new Product(
      new Date().toString(),
      title,
      description,
      amount,
    );
  }
}
