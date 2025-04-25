export class Product {
  id: number;
  price: number;
  name: string;
  description: string;
  img_url: string;

  constructor(id: number, price: number, name: string, description: string, img_url: string) {
    this.id = id;
    this.price = price;
    this.name = name;
    this.description = description;
    this.img_url = img_url;
  }
}