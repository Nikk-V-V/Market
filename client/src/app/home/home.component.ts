import { Component, OnInit } from '@angular/core';
import {SlideService} from "../shared/services/slide.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  right = 0;
  timer: any;
  slides

  constructor(public slide: SlideService) {
    slide.getAll()
  }

  ngOnInit() {
    this.autoSlider()
  }

  leftB() {
    this.right -= 100 / this.slide.length;
    if (this.right === -(100 / this.slide.length)) {
      this.right = (100 / this.slide.length + 100 / this.slide.length);
      clearTimeout(this.timer);
    }
    document.getElementById('content').style.right = `${this.right}%`;
    clearTimeout(this.timer);
    this.autoSlider();
  }

  rightB() {
    this.right += 100 / this.slide.length;
    if (this.right === 100) {
      this.right = 0;
      clearTimeout(this.timer);
    }
    document.getElementById('content').style.right = `${this.right}%`;
    clearTimeout(this.timer);
    this.autoSlider();
  }

  autoSlider() {
    this.timer = setTimeout(() => {
      if (this.right === (100 / this.slide.length + 100 / this.slide.length)) {
        this.right = 0;
        clearTimeout(this.timer);
      } else {
        this.right += 100 / this.slide.length;
      }
      document.getElementById('content').style.right =  `${this.right}%`;
      this.autoSlider();
    }, 5000);
  }

}
