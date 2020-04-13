import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Slide} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  public slides;
  length;

  constructor(private https: HttpClient) { }


  getAll() {
    this.https.get<Slide[]>('/api/slide/').subscribe(
      res => {
        this.slides = res['slide']
        this.length = this.slides.length
      }
    )
  }

  AddSlide(image: File): Observable<Slide> {

    const fd = new FormData()

    fd.append('image', image, image.name)

    console.log(fd.get('image'))

    return this.https.post<Slide>('/api/slide/', fd)
  }

  delete(id): Observable<Slide> {
    return this.https.delete<Slide>(`/api/slide/${id}`)
  }
}
