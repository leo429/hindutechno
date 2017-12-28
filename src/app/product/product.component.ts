import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { DataService } from '../data.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Array<any>;
  product:any;
  name: string;
  
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }
  

  addProduct(product, name: string){
    this.dataService.addProduct(product).subscribe(product => {
      this.goBack();
      this.products.push(product);
      this.name = '';
      
    });
  }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

}
