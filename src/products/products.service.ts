import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, amount: number) {
      const prodId = Math.random().toString();
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

  getProduct(prodId){
      const product = this.products.find(prod => prod.id === prodId)
      if(!product){
          throw new NotFoundException('Could not find product')
      }

      return {...product}
  }
}
