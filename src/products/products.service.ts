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

  async getProducts() {
    try {
      const products = await this.productModel.find().exec();
      return products.map(prod => ({
        id: prod._id,
        title: prod.title,
        description: prod.description,
        amount: prod.amount,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async getProduct(prodId: string): Promise<Product> {
    try {
      const product = await this.productModel.findById(prodId);
      if (!product) {
        throw new NotFoundException('Could not find product');
      }

      return {
        id: product._id,
        title: product.title,
        description: product.description,
        amount: product.amount,
      };
    } catch (error) {
      throw new NotFoundException('Could not find product');
    }
  }

  async updateProduct(
    prodId: string,
    prodTitle: string,
    prodDesc: string,
    prodAmount: number,
  ): Promise<Product> {
    try {
      const updatedProduct = await this.productModel.findById(prodId);
      if (!updatedProduct) {
        throw new NotFoundException('Could not find product');
      }
      if (prodTitle) {
        updatedProduct.title = prodTitle;
      }
      if (prodDesc) {
        updatedProduct.description = prodDesc;
      }
      if (prodAmount) {
        updatedProduct.amount = prodAmount;
      }

      updatedProduct.save();
      return updatedProduct
    } catch (error) {
      throw new NotFoundException('Could not find product');
    }
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
