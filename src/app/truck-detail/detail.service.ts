import { Injectable } from '@angular/core';
import { Voyage } from '../models/voyage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  API_URL = 'http://127.0.0.1:8080/';
  Voyages$: Observable<Voyage[]>;

  constructor(private httpClient: HttpClient) { }

  getVoyages(id: number) {
    return this.httpClient.get(this.API_URL + 'voyages/' + id);
  }
}
