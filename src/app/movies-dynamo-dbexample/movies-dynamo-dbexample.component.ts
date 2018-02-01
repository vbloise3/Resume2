///<reference path="../services/dynamo-dbservice.ts"/>
import { Component, OnInit } from '@angular/core';
import { DynamoDbserviceService, Movie } from '../services/dynamo-dbservice';
import { NgForm } from '@angular/forms';
import { OnlyNumberDirective } from '../directives/only-number.directive';

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
      // alert('component createMovies result before HTML display: ' + this.movies);
    });
  }

  initialDataLoad() {
    this.dynamoDBservice.loadInitialData().subscribe( movies => {
      this.movies = JSON.stringify(movies);
      // alert('component initialDataLoad result before HTML display: ' + this.movies);
    });
  }

  createItem(form: NgForm) {
    const theMovie: Movie = form.value;
    // alert('inMovie: ' + JSON.stringify(form.value));
    this.dynamoDBservice.addItem(theMovie).subscribe( movies => {
      this.movies = JSON.stringify(movies);
      // alert('component initialDataLoad result before HTML display: ' + this.movies);
    });
  }

}
