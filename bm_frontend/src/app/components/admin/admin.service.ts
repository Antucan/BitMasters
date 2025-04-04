import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminSubject = new BehaviorSubject<any>(null);
  admin$ = this.adminSubject.asObservable();

  setAdmin(admin: any) {
    this.adminSubject.next(admin);
  }
}