import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _loader = signal<boolean>(false)

  loading = this._loader.asReadonly()

  constructor() { }


  show(){
    this._loader.set(true)
  }


  hide(){
    this._loader.set(false)
  }

}
