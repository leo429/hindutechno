import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Product } from './product';

import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';


@Injectable()
export class DataService {
  private productsUrl = 'api/products';
  result:any;
  product:any;

  constructor(
    private _http: Http,
  ) { }
  

  /** Get All Products  */
  getProducts() {
    return this._http.get("/api/products")
      .map(result => this.result = result.json().data);
  }

 /** GET Single Product by id. */
  getProduct(id: any):Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers,
    });

    return this._http.get(url, options)
    .map((response: Response) => {
      return response.json()
    })
    .catch(err => {
      return err;
    });
  }
  

  /** Delete Product  */
  deleteProduct(id){
    const url = `${this.productsUrl}/${id}`;
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers,
      body: {
        _id: id
      }
    });
    return this._http.delete(url, options)
    .map((response: Response) => {
      this.getProducts();
      return response.json()
    })
    .catch(err => {
      return err;
    });
  }

  /** Add New Product by id. Will 404 if id not found */
  addProduct(product){
    const url = '/api/products';
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers,
      body: {
        _id: product.id,
        name: product.name,
        color: product.color
      }
    });
    return this._http.post(url, product, options)
    .map((response: Response) => {
      this.getProducts();
      return response.json()
    })
    .catch(err => {
      alert(err);
      return err;
    });
  }
  
  /** PUT: update the Product on the server */
  updateProduct(product: Product, ID): Observable<any>{
    const url = `${this.productsUrl}/${ID}`;
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers,
      body: {
        _id: product.id,
        name: product.name,
        color: product.color
      }
    });
    return this._http.put(url, product, options)
    .map((response: Response) => {
      return response.json()
    })
    .catch(err => {
      return err;
    });

  }

  /** Get All Nodes  */
  getNodes(){
    return this._http.get('/api/nodes').map(result => this.result = result.json().data);
  }


}