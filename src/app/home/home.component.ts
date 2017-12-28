import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Product } from '../product';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nodes: Array<any>;
  products: Array<any>;

  constructor(private dataService: DataService) { }
  title: "Nodes Component";
  
  ngOnInit() {
    this.getNodes();
    this.getProducts();
  }

  getNodes(): void {
    this.dataService.getNodes().subscribe(nodes => this.nodes = nodes);
  }

  getProducts(): void {
    this.dataService.getProducts().subscribe(res => this.products = res);
  }
  
  deleteProduct(id): void {
    this.dataService.deleteProduct(id).subscribe(res => {
      this.getProducts();
    });
  }

}
