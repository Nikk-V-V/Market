import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {DataService} from "./shared/services/data.service";
import { CartComponent } from './cart/cart.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AdminRoomComponent } from './admin-room/admin-room.component';
import {TokenInterceptor} from "./shared/classes/token.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {AuthGuard} from "./shared/classes/auth.guard";
import {AuthService} from "./shared/services/auth.service";
import { SlideComponent } from './slide/slide.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent,
    ProductComponent,
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    AdminRoomComponent,
    SlideComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
    ],
  providers: [
    CategoryComponent,
    DataService,
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
