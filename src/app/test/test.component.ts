import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
// instantiate posts to an empty array
  posts: any = [];
  displayedColumns = ['Title', 'Body'];

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.postsService.getTestPost().subscribe(posts => {
      this.posts = posts;
    });
  }

  getTestPost() {
    // Retrieve posts from the API
    this.postsService.getTestPost().subscribe(posts => {
      this.posts = posts;
    });
  }
}
