import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, amount: number) {
      const prodId = new Date().toString();
    const newProduct = new Product(
      prodId,
      title,
      description,
      amount,
    );
    this.products.push(newProduct);

    return prodId
  }

  getProducts(){
      return [...this.products]
  }
}
