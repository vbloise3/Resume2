import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable()
export class PostsService {

  constructor(private http: HttpClient) { }

  // Get all posts from the API
  getAllPosts() {
    return this.http.get('/api/posts');
      // .map(res => res.json());
  }

  // Get test post from API
  getTestPost() {
    console.log('test post');
    return this.http.get('/api/tester');
      // .map(res => res.json());
  }

  // Get test post from API
  getTest2Post() {
    console.log('test2 post');
    return this.http.get('/api/tester2');
      // .map(res => res.json());
  }
}
