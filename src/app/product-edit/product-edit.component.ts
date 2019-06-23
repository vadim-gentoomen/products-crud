import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../service/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../model/product';
import {first, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  product: Product = {
    id: null,
    productName: '',
    productDesc: '',
    productPrice: null,
    updatedAt: null
  } as Product;

  productForm: FormGroup;

  private unsubscribe$ = new Subject<void>();

  constructor(private api: ApiService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  get controls() {
    return this.productForm.controls;
  }

  ngOnInit(): void {
    this.api.getProduct$(this.route.snapshot.params.id)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((product: Product) => {
        const {productName, productDesc, productPrice} = product;
        this.productForm = this.fb.group({
          productName: [productName, Validators.compose([
            Validators.required,
            Validators.minLength(3),
          ])],
          productDesc: [productDesc, Validators.compose([
            Validators.required,
            Validators.minLength(3),
          ])],
          productPrice: [productPrice, Validators.compose([
            Validators.required,
            Validators.pattern(/^-?\d*[.,]?\d{0,2}$/),
          ])]
        });
        this.product = product;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const {id} = this.product;
      this.product.productName = this.productForm.get('productName').value;
      this.product.productDesc = this.productForm.get('productDesc').value;
      this.product.productPrice = this.productForm.get('productPrice').value;
      this.product.updatedAt = null;

      this.api.updateProduct$(id, this.product)
        .pipe(first())
        .subscribe(() => {
          this.router.navigate(['/products']);
        });
    }

  }

}
