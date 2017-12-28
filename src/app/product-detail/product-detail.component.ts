import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Product } from '../product';
import { DataService } from '../data.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product:Product;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private dataService: DataService,
  ) { }


  ngOnInit() {
    
    
    this.getProduct();
  }

  getProduct():void{
    this.route.params.subscribe(params => {
      const id = params["id"];
      this.dataService.getProduct(id).subscribe(product => this.product = product);
    });
  }
  

  goBack(): void {
    this.location.back();
  }


  save(): void {
    this.route.params.subscribe(params => {
      const id = params["id"];
    this.dataService.updateProduct(this.product, id)
      .subscribe(() => this.goBack());
    });
  }

}
