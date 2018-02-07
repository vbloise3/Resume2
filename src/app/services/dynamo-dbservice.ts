import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

let serviceCreate = '/api/dynamoDBcreate';
let serviceInitialDataLoad = '/api/dynamoDBinitialDataLoad';
let serviceAddItem = '/api/dynamoDBaddItem';
let serviceGetOneItem = '/api/movies';
let serviceUpdateOneItem = '/api/updateMovie';
let serviceDeleteOneItem = '/api/deleteMovie';
let serviceDeleteTable = '/api/deleteTable';
let serviceListBucketContents = '/api/listBucketContents';

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
    resultData = this.http.post(serviceAddItem, inMovie,{ headers: headers });
    // alert('loadInitialData service result: ' + JSON.stringify(resultData));
    return resultData;
  }

  getOneItem(inMovie) {
    let resultData;
    const url = serviceGetOneItem + '/:' + inMovie.year + '/:' + inMovie.title;
    let headers = new HttpHeaders();
    headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '0');
    headers = headers.append('Pragma', 'no-cache');
    resultData = this.http.get(url,{ headers: headers });
    // alert('loadInitialData service result: ' + JSON.stringify(resultData));
    return resultData;
  }

  updateOneItem(inMovie) {
    let resultData;
    const url = serviceUpdateOneItem + '/:' + inMovie.year + '/:' + inMovie.title + '/:' + inMovie.rating + '/:' + inMovie.plot;
    let headers = new HttpHeaders();
    headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '0');
    headers = headers.append('Pragma', 'no-cache');
    resultData = this.http.put(url,{ headers: headers });
    // alert('loadInitialData service result: ' + JSON.stringify(resultData));
    return resultData;
  }

  deleteOneItem(inMovie) {
    let resultData;
    const url = serviceDeleteOneItem + '/:' + inMovie.year + '/:' + inMovie.title;
    let headers = new HttpHeaders();
    headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '0');
    headers = headers.append('Pragma', 'no-cache');
    resultData = this.http.delete(url,{ headers: headers });
    // alert('loadInitialData service result: ' + JSON.stringify(resultData));
    return resultData;
  }

  deleteTable(inMovie) {
    let resultData;
    const url = serviceDeleteTable + '/:' + inMovie.tableName;
    let headers = new HttpHeaders();
    headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '0');
    headers = headers.append('Pragma', 'no-cache');
    resultData = this.http.delete(url,{ headers: headers });
    // alert('loadInitialData service result: ' + JSON.stringify(resultData));
    return resultData;
  }

  listS3BucketContents(inBucket) {
    let resultData;
    const url = serviceListBucketContents + '/:' + inBucket;
    let headers = new HttpHeaders();
    headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '0');
    headers = headers.append('Pragma', 'no-cache');
    resultData = this.http.get(url,{ headers: headers });
    // alert('bucket contents: ' + JSON.stringify(resultData));
    return resultData;
  }
}
