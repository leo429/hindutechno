import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Product } from './product';

import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ApiService {

  result:any;
  private heroesUrl = 'http://localhost:5555/products';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }


   getProducts (): Observable<Product[]> {
    return this.http.get<Product[]>(this.heroesUrl)
      .pipe(
        tap(products => this.log(`fetched products`)),
        catchError(this.handleError('getProducts', []))
      );
   }
  

      /** GET hero by id. Return `undefined` when id not found */
      getProdcutNo404<Data>(id: number): Observable<Product> {
        const url = `${this.heroesUrl}/?id=${id}`;
        return this.http.get<Product[]>(url)
          .pipe(
            map(products => products[0]), // returns a {0|1} element array
            tap(h => {
              const outcome = h ? `fetched` : `did not find`;
              this.log(`${outcome} product id=${id}`);
            }),
            catchError(this.handleError<Product>(`getProduct id=${id}`))
          );
      }

/** GET hero by id. Will 404 if id not found */
getProduct(id: number): Observable<Product> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get<Product>(url).pipe(
    tap(_ => this.log(`fetched product id=${id}`)),
    catchError(this.handleError<Product>(`getProduct id=${id}`))
  );
}



   /** POST: add a new hero to the server */
    addNewProduct (product: Product): Observable<Product> {
      return this.http.post<Product>(this.heroesUrl, product, httpOptions).pipe(
        tap((product: Product) => this.log(`Successfully created ${product.name} product w/ id=${product.name}.`)),
        catchError(this.handleError<Product>('addNewProduct'))
      );
    }


  /** PUT: update the hero on the server */
  updateProduct (product: Product): Observable<any> {
    alert(JSON.stringify(product));
    return this.http.put(this.heroesUrl, product, httpOptions).pipe(
      tap(_ => this.log(`updated product id=${product.id}`)),
      catchError(this.handleError<any>(`updateProduct item url=${this.heroesUrl}/${product.id}`))
    );
  }

  deleteProduct(id){
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError('deleteProduct'))
    );
  }


   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('Message: ' + message);
  }

}
