import {Component, OnInit} from '@angular/core';
import {Product} from '../model/product';
import {ApiService} from '../service/api.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  // displayedColumns: string[] = ['prod_name', 'prod_price'];
  data$: Observable<Product[]>;
  isLoadingResults = true;

  constructor(private api: ApiService) {
    this.data$ = this.api.getProducts$();
  }

  ngOnInit() {
  }

}
