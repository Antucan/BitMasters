import { Product } from "./product.model";

export class Purchase {
    id: number;
    user: number;
    product: Product;
    quantity: number;
    purchase_date: Date;
    status: string; 
    
    constructor(id: number, user_id: number, product_id: Product, quantity: number, purchase_date: Date, status: string) {
      this.id = id;
      this.user = user_id;
      this.product = product_id;
      this.quantity = quantity;
      this.purchase_date = purchase_date;
      this.status = status;
    }
  }