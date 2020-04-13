import { Injectable } from '@angular/core';
import {Category} from "../interfaces";
import {Observable} from "rxjs";
import {Params} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories;

  constructor(private https: HttpClient) { }

  getAll() {
    this.https.get('/api/category/').subscribe(
      data => this.categories = data['category']
    )
  }

  create(category){
    this.https.post<Category>('/api/category/', category).subscribe( res => {
      this.categories += res['category']
    })
  }
}
