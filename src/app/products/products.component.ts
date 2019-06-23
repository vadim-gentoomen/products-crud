import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../model/product';
import {ApiService} from '../service/api.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  data$: Observable<Product[]>;
  private unsubscribe$ = new Subject<void>();

  constructor(private api: ApiService) {
    this.data$ = this.api.getProducts$();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  trackByFn(index, product: Product) {
    return product.id;
  }

  deleteProduct(id) {
    // TODO: нормальный confirmation
    if (window.confirm('Вы увереены, что хотите удалить товар?')) {
      this.api.deleteProduct$(id)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe((product: Product) => {
          this.data$ = this.api.getProducts$();
        });
    }
  }

}
