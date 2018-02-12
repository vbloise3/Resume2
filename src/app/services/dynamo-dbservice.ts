import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

let serviceCreate = '/api/dynamoDBcreate';
let serviceInitialDataLoad = '/api/dynamoDBinitialDataLoad';
let serviceAddItem = '/api/dynamoDBaddItem';
let serviceGetOneItem = '/api/c2pqandas';
let serviceUpdateOneItem = '/api/updateQandA';
let serviceDeleteOneItem = '/api/deleteQandA';
let serviceDeleteTable = '/api/deleteTable';
let serviceListBucketContents = '/api/listBucketContents';

export interface QandA {
  id: string;
  category: string;
  subcategory: string;
  questionType: string;
  question: string;
  answers: any;
  correctAnswer: any;
}

export interface  Movie {
  year: string;
  title: number;
  plot: number;
  rating: string;
}

@Injectable()
export class DynamoDbserviceService {

  constructor(private http: HttpClient) { }

  createC2PQandATable() {
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

  addItem(inQandA) {
    let resultData;
    let headers = new HttpHeaders();
    headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '0');
    headers = headers.append('Pragma', 'no-cache');
    resultData = this.http.post(serviceAddItem, inQandA,{ headers: headers });
    // alert('loadInitialData service result: ' + JSON.stringify(resultData));
    return resultData;
  }

  getOneItem(inQandA) {
    let resultData;
    const url = serviceGetOneItem + '/:' + inQandA.id + '/:' + inQandA.category;
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

  updateOneItem(inQandA) {
    let resultData;
    const url = serviceUpdateOneItem + '/:' + inQandA.id + '/:' + inQandA.category + '/:' + inQandA.subcategory + '/:' + inQandA.questionType + '/:' + inQandA.question;
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

  deleteOneItem(inQandA) {
    let resultData;
    const url = serviceDeleteOneItem + '/:' + inQandA.id + '/:' + inQandA.category;
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

  deleteTable(inQandA) {
    let resultData;
    const url = serviceDeleteTable + '/:' + inQandA.tableName;
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
