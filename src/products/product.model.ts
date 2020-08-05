import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
});

export interface Product {
  
    id: string;
    title: string;
    description: string;
    amount: number;
 
}