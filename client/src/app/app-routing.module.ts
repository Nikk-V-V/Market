import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CategoryComponent} from "./category/category.component";
import {ProductComponent} from "./product/product.component";
import {CartComponent} from "./cart/cart.component";
import {AdminRoomComponent} from "./admin-room/admin-room.component";
import {AuthGuard} from "./shared/classes/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home' , component: HomeComponent},
  { path: 'category/:id', component: CategoryComponent},
  { path: 'product/:id', component: ProductComponent},
  { path: 'cart', component: CartComponent},
  { path: 'adminMarket', component: AdminRoomComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
