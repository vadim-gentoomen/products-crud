import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NGXLogger} from 'ngx-logger';
import {Product} from '../model/product';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = '/api/v1/products';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
              private logger: NGXLogger) {
    this.logger.debug('ApiService');
  }

  getProducts$(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl)
      .pipe(
        tap((products: Product[]) => this.logger.log('Список товаров', products)),
        catchError(this.handleError('getProducts$', []))
      );
  }

  getProduct$(id: number): Observable<Product> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.logger.log(`Получен товар с id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  addProduct$(product): Observable<Product> {
    return this.http.post<Product>(apiUrl, product, httpOptions).pipe(
      tap((prod: Product) => this.logger.log(`Добален товар с id=${prod.id}`)),
      catchError(this.handleError<Product>('addProduct$'))
    );
  }

  updateProduct$(id, product): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, product, httpOptions).pipe(
      tap(() => this.logger.log(`Обновлен товар с id=${id}`)),
      catchError(this.handleError<any>('updateProduct$'))
    );
  }

  deleteProduct$(id): Observable<Product> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(() => this.logger.log(`Удален товар с id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct$'))
    );
  }


  private handleError<T>(operation = 'empty operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(error);
      return of(result as T);
    };
  }
}
