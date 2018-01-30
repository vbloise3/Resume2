///<reference path="../services/dynamo-dbservice.ts"/>
import { Component, OnInit } from '@angular/core';
import { DynamoDbserviceService} from '../services/dynamo-dbservice';

@Component({
  selector: 'app-movies-dynamo-dbexample',
  templateUrl: './movies-dynamo-dbexample.component.html',
  styleUrls: ['./movies-dynamo-dbexample.component.css']
})
export class MoviesDynamoDbexampleComponent implements OnInit {

  movies: any = '';

  constructor(private dynamoDBservice: DynamoDbserviceService) {

  }

  ngOnInit() {
  }

  tester() {

  }

  createMovies() {
    this.dynamoDBservice.createMoviesTable().subscribe(movies => {
      this.movies = JSON.stringify(movies);
    });
  }

  initialDataLoad() {
    this.dynamoDBservice.loadInitialData().subscribe( movies => {
      this.movies = JSON.stringify(movies);
    });
  }

}
