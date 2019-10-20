import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Truck } from '../models/truck';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const API_URL = 'http://127.0.0.1:8080/';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpClient: HttpClient) { }

  getTrucks() {
    return this.httpClient.get(API_URL + 'devices');
  }

  addTruck(truck: Truck): Observable<Truck> {
    return this.httpClient.post<Truck>(API_URL + 'devices/add' , truck, httpOptions).pipe(
      tap((tru: Truck) => console.log('added product id=${tru.id}')),
      catchError(this.handleError<Truck>('addTruck'))
    );
  }

  deleteTruck(code: string) {
    return this.httpClient.get(API_URL + 'devices/delete/' + code);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
