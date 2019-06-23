import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ProductEntity, products} from './products-entity';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === '/api/v1/products') {

      switch (req.method) {
        case 'GET':
          if (!req.params.has('id')) {
            return of(new HttpResponse({status: 200, body: products}));
          } else {
            const product = products.find((prod: ProductEntity) => prod.id === parseInt(req.params.get('id'), 10));
            return of(new HttpResponse({status: 200, body: product}));
          }

        case 'POST':
          const newProduct = req.body as ProductEntity;
          newProduct.id = this.nextId();
          newProduct.updatedAt = new Date();
          products.push(newProduct);
          return of(new HttpResponse({status: 200}));

        case 'PUT':
          const updatedProduct = req.body as ProductEntity;
          const id = req.params.get('id');
          if (updatedProduct && id) {
            const idx1 = products.map((deletedProduct: ProductEntity) => deletedProduct.id)
              .indexOf(updatedProduct.id);
            products[idx1] = updatedProduct;
            return of(new HttpResponse({status: 200}));
          } else {
            return of(new HttpResponse({status: 404}));
          }

        case 'DELETE':
          const idx2 = products.map((deletedProduct: ProductEntity) => deletedProduct.id)
            .indexOf(parseInt(req.params.get('id'), 10));
          if (idx2 !== -1) {
            products.splice(idx2, 1);
          }
          return of(new HttpResponse({status: 200}));

        default:
          return next.handle(req);
      }

    }

    return next.handle(req);
  }

  private nextId(): number {
    return Math.max(...products.map((product: ProductEntity) => product.id)) + 1;
  }
}


