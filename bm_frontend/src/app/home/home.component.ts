import { Component } from '@angular/core';
import { CatalogComponent } from '../components/catalog/catalog.component';
import { BannerComponent } from '../components/banner/banner.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CatalogComponent, BannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
