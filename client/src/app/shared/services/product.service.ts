import { Injectable } from '@angular/core';
import {Params} from "@angular/router";
import {Observable} from "rxjs";
import {Product} from "../interfaces";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products;
  searchProduct = [];

  constructor(private https: HttpClient) { }

  getByCategory(id: Params): Observable<Product[]> {
    return this.https.get<Product[]>(`api/product/products/${id}`)
  }

  getById(id: Params): Observable<Product> {
    return this.https.get<Product>(`api/product/${id}`)
  }

  getAll() {
    this.https.get('api/product/').subscribe(
      res => {
        this.products = res['products']
      }
    )
  }

  search(e) {
    let str = []
    let str2 = []

    this.searchProduct = []

    for (let i = 0; i < this.products.length; i++) {

      str = e.split(' ')
      str2 = this.products[i].title.split(' ')

      for (let j = 0; j < str.length; j++) {
        if (str[j].toLowerCase() === str2[j].toLowerCase()) {
          if (!this.searchProduct.find(x => x === this.products[i])) {
            this.searchProduct.push(this.products[i])
          }
        }
      }
    }



  }

  create(product): Observable<Product> {
    return this.https.post<Product>('/api/product/', product)
  }

}
