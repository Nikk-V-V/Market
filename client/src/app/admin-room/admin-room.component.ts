import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SlideService} from "../shared/services/slide.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin-room',
  templateUrl: './admin-room.component.html',
  styleUrls: ['./admin-room.component.scss']
})
export class AdminRoomComponent implements OnInit, OnDestroy {


  slide = false;
  product = true;

  constructor() {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  SlideOrProduct(slide: boolean, product: boolean) {
    this.slide = slide
    this.product = product
  }


}
