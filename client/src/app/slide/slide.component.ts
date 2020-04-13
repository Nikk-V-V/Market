import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormGroup} from "@angular/forms";
import {SlideService} from "../shared/services/slide.service";

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit, OnDestroy {

  imagePreview: string | ArrayBuffer;
  sSub: Subscription;
  image: File;
  products: FormGroup


  constructor(public slid: SlideService) {
    slid.getAll()
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.sSub) this.sSub.unsubscribe()
  }


  onSubmit() {
    let $obj
    $obj = this.slid.AddSlide(this.image);
    $obj.subscribe(
      slid => {
        this.slid.slides.push(slid['slide'])
        this.imagePreview = null
      }
    )
  }

  delete(id) {
    let $obj
    $obj = this.slid.delete(id)
    $obj.subscribe(
      slid => {
        this.slid.slides = slid['slide']
      }
    )
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
