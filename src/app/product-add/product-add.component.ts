import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../service/api.service';
import {Product} from '../model/product';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;

  constructor(private api: ApiService,
              private fb: FormBuilder,
              private router: Router) {

    this.productForm = this.fb.group({
      productName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      productDesc: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      productPrice: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^-?\d*[.,]?\d{0,2}$/),
      ])]
    });
  }

  get controls() {
    return this.productForm.controls;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = {
        id: null,
        productName: this.productForm.get('productName').value,
        productDesc: this.productForm.get('productDesc').value,
        productPrice: this.productForm.get('productPrice').value,
        updatedAt: null
      } as Product;

      this.api.addProduct$(product)
        .pipe(first())
        .subscribe(() => {
          this.router.navigate(['/products']);
        });
    }

  }

}
