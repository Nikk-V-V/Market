import { Component, OnInit } from '@angular/core';
import {ProductService} from "../shared/services/product.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SlideService} from "../shared/services/slide.service";
import {CategoryService} from "../shared/services/category.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  imagePreview: string | ArrayBuffer;
  image: File;
  products: FormGroup


  constructor(public product: ProductService, public category: CategoryService) {

  }

  ngOnInit(): void {
    this.products = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
    })
  }



  onSubmit() {
    let $obj
    let fd = new FormData()
    for (let key in this.products.value) {
      fd.append(key, this.products.value[key])
    }
    fd.append('image', this.image, this.image.name)

    $obj = this.product.create(fd)

    $obj.subscribe(res => {
      this.product.products += res['product']
    })

  }

  onFileSelect(event) {
    const file = event.target.files[0]

    this.image = file;

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(file)
  }


}
