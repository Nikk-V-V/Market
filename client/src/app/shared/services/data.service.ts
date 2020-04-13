import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router'
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  message = '';
  messageType: String;
  user: any;

  cartItems = new Subject<number>();

  constructor(private router: Router, private https: HttpClient) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.message = '';
      }
    })
  }

  error(message) {
    this.messageType = 'danger';
    this.message = message;
  }

  success(message) {
    this.messageType = 'success';
    this.message = message;
  }

  warning(massage) {
    this.messageType = 'warning';
    this.message = massage;
  }

  async getProfile() {
    try {
      if (localStorage.getItem('token')) {
        const data = await this.https.get(
          '/api/auth/'
        );
        this.user = data['user'];
      }
    } catch (error) {
      this.error(error);
    }
  }

  getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(item: string) {
    const cart: any = this.getCart();
    if (cart.find(data => JSON.stringify(data) === JSON.stringify(item))) {
      return false;
    } else {
      cart.push(item);
      this.cartItems.next(cart.length)
      localStorage.setItem('cart', JSON.stringify(cart));
      return true;
    }
  }

  getCountCartItems() {
    this.cartItems.next(this.getCart().length)
  }

  removeFromCart(item: string) {
    let cart: any = this.getCart();
    if (cart.find(data => JSON.stringify(data) === JSON.stringify(item))) {
      cart = cart.filter(data => JSON.stringify(data) !== JSON.stringify(item));
      this.cartItems.next(cart.length);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  clearCart() {
    this.cartItems.next(0);
    localStorage.setItem('cart', '[]');
  }
}
