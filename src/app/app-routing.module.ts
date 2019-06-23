import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductAddComponent} from './product-add/product-add.component';
import {ProductEditComponent} from './product-edit/product-edit.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    data: {title: 'Список товаров'}
  },
  {
    path: 'product-details/:id',
    component: ProductDetailComponent,
    data: {title: 'Описание товара'}
  },
  {
    path: 'product-add',
    component: ProductAddComponent,
    data: {title: 'Добавить товар'}
  },
  {
    path: 'product-edit/:id',
    component: ProductEditComponent,
    data: {title: 'Редактировать товар'}
  },
  {
    path: '**',
    redirectTo: 'products',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
