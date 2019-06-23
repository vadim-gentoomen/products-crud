import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../service/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../model/product';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Product = {
    id: null,
    productName: '',
    productDesc: '',
    productPrice: null,
    updatedAt: null
  } as Product;
  private unsubscribe$ = new Subject<void>();

  constructor(private api: ApiService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.api.getProduct$(this.route.snapshot.params.id)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((product: Product) => {
        this.product = product;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  deleteProduct(id: number) {
    // TODO: нормальный confirmation
    if (window.confirm('Вы увереены, что хотите удалить товар?')) {
      this.api.deleteProduct$(id)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe((product: Product) => {
          this.router.navigate(['/products']);
        });
    }
  }

}
