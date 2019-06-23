import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MockBackendInterceptor} from './mock-backend-interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: MockBackendInterceptor, multi: true},
  ]
})
export class MockBackendModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MockBackendModule,
    };
  }
}

