import { Component, OnInit } from '@angular/core';
import {ProductService} from "../shared/services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../shared/services/data.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product;

  constructor(private productS: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              public data: DataService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.productS.getById(res['id']).subscribe(
        x => {
          this.product = x['product']
          console.log(this.product)
        }
      )
    })
  }


}
