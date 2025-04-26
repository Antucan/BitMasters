import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginVisible = new BehaviorSubject<boolean>(false);
  loginVisible$ = this.loginVisible.asObservable();

  showAdminLogin() {
    this.loginVisible.next(true);
  }

  hideAdminLogin() {
    this.loginVisible.next(false);
  }
}