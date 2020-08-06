import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, description: string, amount: number) {
    const newProduct = new this.productModel({ title, description, amount });
    try {
      const result = await newProduct.save();
      return result.id as string;
    } catch (e) {
      console.log(e);
    }
  }

  getProducts() {
    return [...this.products];
  }

  getProduct(prodId) {
    const product = this.products.find(prod => prod.id === prodId);
    if (!product) {
      throw new NotFoundException('Could not find product');
    }

    return { ...product };
  }

  updateProduct(
    prodId: string,
    prodTitle: string,
    prodDesc: string,
    prodAmount: number,
  ) {
    const productIndex = this.products.findIndex(prod => prod.id === prodId);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product');
    }

    if (prodTitle) {
      product.title = prodTitle;
    }
    if (prodDesc) {
      product.description = prodDesc;
    }
    if (prodAmount) {
      product.amount = prodAmount;
    }

    return product;
  }

  deleteProduct(prodId) {
    const productIndex = this.products.findIndex(prod => prod.id === prodId);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product');
    }

    this.products.splice(productIndex, 1);
  }
}
