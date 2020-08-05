import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose'

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(@InjectModel('Product') private readonly productModel:Model<Product>){

  }

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

  updateProduct(prodId:string,prodTitle:string,prodDesc:string,prodAmount:number){
    const productIndex = this.products.findIndex(prod => prod.id === prodId)
    const product = this.products[productIndex]
    if(!product){
        throw new NotFoundException('Could not find product')
    }

    if(prodTitle){
        product.title = prodTitle
    }
    if(prodDesc){
        product.description = prodDesc
    }
    if(prodAmount){
        product.amount = prodAmount
    }


    return product
  }

  deleteProduct(prodId){
    const productIndex = this.products.findIndex(prod => prod.id === prodId)
    const product = this.products[productIndex]
    if(!product){
        throw new NotFoundException('Could not find product')
    }

   this.products.splice(productIndex,1)
}
  
}
