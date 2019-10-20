import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  API_URL = 'http://127.0.0.1:8080/';

  constructor(private httpClient: HttpClient) { }

  getTrucks() {
    return this.httpClient.get(this.API_URL + 'devices');
  }
}
