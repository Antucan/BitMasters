import { User } from "./user.model";

export class Address {
    id: number;
    street_type: string;
    name: string;
    zip_code: number;
    city: string;
    user: User; 
    
    constructor(id: number, street_type: string, name: string, zip_code:number, city: string, user: User) {
      this.id = id;
      this.street_type = street_type;
      this.name = name;
      this.zip_code = zip_code;
      this.city = city;
      this.user = user;
    }
  }