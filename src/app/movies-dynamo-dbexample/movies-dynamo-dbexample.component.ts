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
  getPlot: any;
  getRating: any;
  updatePlot: any;
  updateRating: any;
  deletePlot: any;
  deleteRating: any;
  deletedTable: any;

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

  getOneItem(form: NgForm) {
    const theMovie: Movie = form.value;
    // alert('inMovie: ' + JSON.stringify(form.value));
    this.dynamoDBservice.getOneItem(theMovie).subscribe( movies => {
      this.movies = JSON.stringify(movies);
      // alert('the returned json: ' + this.movies);
      if ( this.movies === '{}') {
        this.getRating = '';
        this.getPlot = '';
      } else {
        this.getRating = movies.Item.info.rating;
        this.getPlot = movies.Item.info.plot;
      }
      // alert('component initialDataLoad result before HTML display: ' + this.movies);
    });
  }

  updateOneItem(form: NgForm) {
    const theMovie: Movie = form.value;
    // alert('inMovie: ' + JSON.stringify(form.value));
    this.dynamoDBservice.updateOneItem(theMovie).subscribe( movies => {
      this.movies = JSON.stringify(movies);
      // alert('the returned json: ' + this.movies);
      if ( this.movies === '{}') {
        this.updateRating = '';
        this.updatePlot = '';
      } else {
        this.updateRating = movies.Attributes.info.rating;
        this.updatePlot = movies.Attributes.info.plot;
      }
      // alert('component initialDataLoad result before HTML display: ' + this.movies);
    });
  }

  deleteOneItem(form: NgForm) {
    const theMovie: Movie = form.value;
    // alert('inMovie: ' + JSON.stringify(form.value));
    this.dynamoDBservice.deleteOneItem(theMovie).subscribe( movies => {
      this.movies = JSON.stringify(movies);
      // alert('the returned json: ' + this.movies);
      if ( this.movies === '{}') {
        this.deleteRating = '';
        this.deletePlot = '';
      } else {
        this.deleteRating = movies.Attributes.info.rating;
        this.deletePlot = movies.Attributes.info.plot;
      }
      // alert('component initialDataLoad result before HTML display: ' + this.movies);
    });
  }

  deleteTable(form: NgForm) {
    const theMovie: Movie = form.value;
    // alert('inMovie: ' + JSON.stringify(form.value));
    this.dynamoDBservice.deleteTable(theMovie).subscribe( movies => {
      this.movies = JSON.stringify(movies);
      // alert('the returned json: ' + this.movies);
      if ( this.movies === '{}') {
        this.deleteRating = '';
        this.deletePlot = '';
      } else {
        this.deletedTable = movies.TableDescription.TableName + ', ' + movies.TableDescription.TableArn;
      }
      // alert('component initialDataLoad result before HTML display: ' + this.movies);
    });
  }
}
