///<reference path="../services/dynamo-dbservice.ts"/>
import { Component, OnInit } from '@angular/core';
import { DynamoDbserviceService, Movie, QandA } from '../services/dynamo-dbservice';
import { NgForm } from '@angular/forms';
import { OnlyNumberDirective } from '../directives/only-number.directive';

@Component({
  selector: 'app-c2p-dynamo-db',
  templateUrl: './c2p-dynamo-db.component.html',
  styleUrls: ['./c2p-dynamo-db.component.css']
})

export class C2pDynamoDbComponent implements OnInit {

  qandas: any = '';
  buckets: any = '';
  theBucketList: any = '';
  s3BucketName: any = '';
  getId: any;
  getCategory: any;
  getSubcategory: any;
  getQuestionType: any;
  getQuestion: any;
  updateSubcategory: any;
  updateCategory: any;
  updateQuestionType: any;
  updateQuestion: any;
  deleteSubcategory: any;
  deleteCategory: any;
  deleteQuestionType: any;
  deleteQuestion: any;
  deletedTable: any;

  constructor(private dynamoDBservice: DynamoDbserviceService) {

  }

  ngOnInit() {
  }

  tester() {

  }

  createC2pQandA() {
    this.dynamoDBservice.createC2PQandATable().subscribe(qandas => {
      this.qandas = JSON.stringify(qandas);
      // alert('component createC2pQandA result before HTML display: ' + this.qandas);
    });
  }

  initialDataLoad() {
    this.dynamoDBservice.loadInitialData().subscribe( qandas => {
      this.qandas = JSON.stringify(qandas);
      // alert('component initialDataLoad result before HTML display: ' + this.qandas);
    });
  }

  createItem(form: NgForm) {
    const theQanda: QandA = form.value;
    // alert('inMovie: ' + JSON.stringify(form.value));
    this.dynamoDBservice.addItem(theQanda).subscribe( qandas => {
      this.qandas = JSON.stringify(qandas);
      // alert('component initialDataLoad result before HTML display: ' + this.movies);
    });
  }

  getOneItem(form: NgForm) {
    const theQanda: QandA = form.value;
    // alert('inQanda: ' + JSON.stringify(form.value));
    this.dynamoDBservice.getOneItem(theQanda).subscribe( qandas => {
      this.qandas = JSON.stringify(qandas);
      // alert('the returned json: ' + this.qandas);
      if ( this.qandas === '{}') {
        this.getCategory = '';
        this.getSubcategory = '';
        this.getQuestionType = '';
        this.getQuestion = '';
      } else {
        this.getCategory = qandas.Item.info.category;
        this.getSubcategory = qandas.Item.info.subcategory;
        this.getQuestionType = qandas.Item.info.questionType;
        this.getQuestion = qandas.Item.info.question;
      }
      // alert('component initialDataLoad result before HTML display: ' + this.qandas);
    });
  }

  updateOneItem(form: NgForm) {
    const theQanda: QandA = form.value;
    // alert('inQanda: ' + JSON.stringify(theQanda));
    this.dynamoDBservice.updateOneItem(theQanda).subscribe( qandas => {
      this.qandas = JSON.stringify(qandas);
      // alert('the returned json: ' + this.qandas);
      if ( this.qandas === '{}') {
        this.updateCategory = '';
        this.updateSubcategory = '';
        this.updateQuestionType = '';
        this.updateQuestion = '';
      } else {
        this.updateCategory = qandas.Attributes.info.category;
        this.updateSubcategory = qandas.Attributes.info.subcategory;
        this.updateQuestionType = qandas.Attributes.info.questionType;
        this.updateQuestion = qandas.Attributes.info.question;
      }
      // alert('component initialDataLoad result before HTML display: ' + this.qandas);
    });
  }

  deleteOneItem(form: NgForm) {
    const theQanda: QandA = form.value;
    alert('inQanda: ' + JSON.stringify(form.value));
    this.dynamoDBservice.deleteOneItem(theQanda).subscribe( qandas => {
      this.qandas = JSON.stringify(qandas);
      // alert('the returned json: ' + this.qandas);
      if ( this.qandas === '{}') {
        this.deleteCategory = '';
        this.deleteSubcategory = '';
        this.deleteQuestionType = '';
        this.deleteQuestion = '';
      } else {
        this.deleteCategory = qandas.Attributes.info.category;
        this.deleteSubcategory = qandas.Attributes.info.subcategory;
        this.deleteQuestionType = qandas.Attributes.info.questionType;
        this.deleteQuestion = qandas.Attributes.info.question;
      }
      // alert('component initialDataLoad result before HTML display: ' + this.qandas);
    });
  }

  deleteTable(form: NgForm) {
    const theQanda: QandA = form.value;
    // alert('inQanda: ' + JSON.stringify(form.value));
    this.dynamoDBservice.deleteTable(theQanda).subscribe( qandas => {
      this.qandas = JSON.stringify(qandas);
      // alert('the returned json: ' + this.qandas);
      if ( this.qandas === '{}') {
        this.deleteCategory = '';
        this.deleteSubcategory = '';
        this.deleteQuestionType = '';
        this.deleteQuestion = '';
      } else {
        this.deletedTable = qandas.TableDescription.TableName + ', ' + qandas.TableDescription.TableArn;
      }
      // alert('component initialDataLoad result before HTML display: ' + this.movies);
    });
  }
  listS3BucketContents(form: NgForm) {
    const theBucket: any = form.value;
    this.dynamoDBservice.listS3BucketContents(theBucket.s3BucketName).subscribe( buckets => {
      // alert('bucket name: ' + JSON.stringify(theBucket));
      this.buckets = JSON.stringify(buckets);
      if ( this.buckets === '{}') {
        this.theBucketList = '';
      } else {
        this.theBucketList = this.buckets;
      }
    });
  }
}
