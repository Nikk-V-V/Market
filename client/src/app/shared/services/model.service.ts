import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  log: boolean;
  reg: boolean;

  constructor() { }

  chooseLogReg(log:boolean, reg: boolean) {
      this.log = log
      this.reg = reg
  }



}
