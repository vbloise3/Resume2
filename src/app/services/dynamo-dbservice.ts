import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

let serviceCreate = '/api/dynamoDBcreate';
let serviceInitialDataLoad = '/api/dynamoDBinitialDataLoad';
let serviceAddItem = '/api/dynamoDBaddItem';

export interface Movie {
  year: string;
  title: number;
  plot: number;
  rating: string;
}

@Injectable()
export class DynamoDbserviceService {

  constructor(private http: HttpClient) { }

  createMoviesTable() {
    let headers = new HttpHeaders();
    headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '0');
    headers = headers.append('Pragma', 'no-cache');
    return this.http.get(serviceCreate, {headers: headers});
  }

  loadInitialData() {
    let resultData;
    let headers = new HttpHeaders();
    headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '0');
    headers = headers.append('Pragma', 'no-cache');
    resultData = this.http.get(serviceInitialDataLoad, {headers: headers});
    // alert('loadInitialData service result: ' + JSON.stringify(resultData));
    return resultData;
  }

  addItem(inMovie) {
    let resultData;
    let headers = new HttpHeaders();
    headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '0');
    headers = headers.append('Pragma', 'no-cache');
    resultData = this.http.post(serviceAddItem, inMovie,{headers: headers});
    // alert('loadInitialData service result: ' + JSON.stringify(resultData));
    return resultData;
  }
}
