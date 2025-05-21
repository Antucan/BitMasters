import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  gmail = 'bitmasters@gmail.com';

  constructor(public router: Router){ }

  redirectHome(){
    this.router.navigate(['/'])
  }

  redirectAboutUs(){
    this.router.navigate(['/about-us'])
  }
}
