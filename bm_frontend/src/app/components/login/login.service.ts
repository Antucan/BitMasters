import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginVisible = new BehaviorSubject<boolean>(false);
  loginVisible$ = this.loginVisible.asObservable();

  showLogin() {
    console.log("sfsdfsdfa")
    this.loginVisible.next(true);
  }

  hideLogin() {
    this.loginVisible.next(false);
  }
}