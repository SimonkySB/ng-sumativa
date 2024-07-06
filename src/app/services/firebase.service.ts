import { Injectable, inject } from '@angular/core';

import { FirebaseApp, initializeApp } from "firebase/app";
import { FirebaseStorage, getStorage, ref, getDownloadURL, uploadString  } from "firebase/storage";
import { environment } from '../../environments/environment';
import { from, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  #app: FirebaseApp;
  #storage: FirebaseStorage;
  #http = inject(HttpClient);

  constructor() { 
    this.#app = initializeApp(environment.firebaseConfig);
    this.#storage = getStorage()
  }


  get<T>(path: string){
    return from(getDownloadURL(ref(this.#storage, path))).pipe(
      switchMap((url) => this.#http.get<T>(url))
    )
  }

  post<T>(path: string, data: T){
    return from(uploadString(ref(this.#storage, path), JSON.stringify(data), "raw", {
      contentType: "application/json"
    }))
  }
  
}
