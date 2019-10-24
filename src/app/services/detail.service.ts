import { Injectable } from '@angular/core';
import { Voyage } from '../models/voyage';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'http://127.0.0.1:8080/';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  headers = new HttpHeaders();
  constructor(private httpClient: HttpClient) { }

  getVoyages(id: number) {
    return this.httpClient.get(API_URL + 'voyages/' + id);
  }

  exportVoyages(id: number, date: string): Observable<HttpResponse<string>> {
    let headersp = new HttpHeaders();
    headersp = headersp.append('Accept', 'text/csv');
    return this.httpClient.get(API_URL + 'voyages/' + id + '/' + date + '/export', {
      headers: headersp,
      observe: 'response',
      responseType: 'text'
    });
  }

  exportRecords(id: number, date: string): Observable<HttpResponse<string>> {
    let headersp = new HttpHeaders();
    headersp = headersp.append('Accept', 'text/csv');
    return this.httpClient.get(API_URL + 'records/' + id + '/' + date + '/export', {
      headers: headersp,
      observe: 'response',
      responseType: 'text'
    });
  }
}
