import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  gmail = 'bitmasters@gmail.com';

  constructor(public router: Router){ }

  redirectHome(){
    this.router.navigate(['/'])
  }

}
