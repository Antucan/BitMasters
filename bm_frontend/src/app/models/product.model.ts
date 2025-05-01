export class Product {
  id: number;
  price: number;
  name: string;
  description: string;
  img_url: string;
  user: string;
  category: string; 
  
  constructor(id: number, price: number, name: string, description: string, img_url: string, user: string, category: string) {
    this.id = id;
    this.price = price;
    this.name = name;
    this.description = description;
    this.img_url = img_url;
    this.user = user;
    this.category = category;
  }
}