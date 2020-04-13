import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../shared/services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../shared/services/product.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  products;
  isProducts: boolean;

  constructor(
    private category: CategoryService,
    private product: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.product.getByCategory(res['id']).subscribe(
        x => {
          this.products = x['products']
          this.isProducts = !!this.products[0]
        }
      )
    });
  }

  details(id) {
    this.router.navigateByUrl(`/product/${id}`)
    this.product.searchProduct = []
  }

}
