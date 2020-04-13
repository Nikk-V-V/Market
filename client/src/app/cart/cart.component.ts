import { Component, OnInit } from '@angular/core';
import {DataService} from "../shared/services/data.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products;

  constructor(public data: DataService) { }

  ngOnInit(): void {
    this.products = this.data.getCart()
  }

  remove(item) {
    this.data.removeFromCart(item)
    this.products = this.data.getCart();
  }
}
