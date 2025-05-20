import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class addPurchase {
  constructor(private conexHttp: HttpClient) { }
  postPurchase(user_id: number, product_id: number, quantity: number): Observable<any> {
    let purchase = {
      "user_id": user_id,
      "product_id": product_id,
      "quantity": quantity,
      "status": 1
    };
    let url = "http://127.0.0.1:8000/purchases/new";
    return this.conexHttp.post(url, purchase, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}