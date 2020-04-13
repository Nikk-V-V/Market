import {Component, OnInit} from '@angular/core';
import {CategoryService} from "./shared/services/category.service";
import {DataService} from "./shared/services/data.service";
import {Observable} from "rxjs";
import {ModelService} from "./shared/services/model.service";
import {AuthService} from "./shared/services/auth.service";
import {ProductService} from "./shared/services/product.service";
import {CategoryComponent} from "./category/category.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  isAuth: boolean;
  count;
  value = "";

  constructor(
    public category: CategoryService,
    private data: DataService,
    public model: ModelService,
    public auth: AuthService,
    public product: ProductService,
    public categoryC: CategoryComponent
  ) {
    this.category.getAll();
    this.product.getAll();
    this.data.cartItems.subscribe(x => this.count = x ? x : null)
  }

  ngOnInit(): void {
    const potentialToken = localStorage.getItem('auth-token')
    if (potentialToken !== null) this.auth.setToken(potentialToken)
    this.data.getCountCartItems()
    this.auth.auth.subscribe(x => this.isAuth = x)
  }

  show() {
    const menu = document.getElementById('menu'),
        arrow = document.getElementById('arrow')
    if (menu.style.opacity === '1') {
      menu.style.opacity = '0'
      menu.style.top = '-103px'
      arrow.className = 'fas fa-caret-up'
    } else {
      menu.style.opacity = '1'
      menu.style.top = '27px'
      arrow.className = 'fas fa-caret-down'
    }
  }

  showCategory() {
    const category = document.getElementById('category'),
        arrow = document.getElementById('arrow-category')
    if (category.style.height === '1px') {
      category.style.height = 'auto'
      arrow.className = 'fas fa-caret-down'
    } else {
      category.style.height = '1px'
      arrow.className = 'fas fa-caret-up'
    }
  }

  showHidenModel() {
    const model = document.getElementById('model').style
    if(model.opacity == '1') {
      model.opacity = '0'
      model.zIndex = '-1'
    } else {
      model.opacity = '1'
      model.zIndex = '100'
    }
  }

  clean() {
    this.product.searchProduct = []
  }
}
