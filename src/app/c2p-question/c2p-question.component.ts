import { Component, OnInit } from '@angular/core';
import { DynamoDbserviceService, Movie, QandA } from '../services/dynamo-dbservice';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-c2p-question',
  templateUrl: './c2p-question.component.html',
  styleUrls: ['./c2p-question.component.css']
})
export class C2pQuestionComponent implements OnInit {

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

  constructor(private dynamoDBservice: DynamoDbserviceService) { }

  ngOnInit() {
    let theQandAs: QandA[] = [];
    let theReturnedJSON: any;
    theReturnedJSON = this.dynamoDBservice.getAllItems().subscribe( qandas => {
      this.qandas = JSON.stringify(qandas);
      alert('the first returned Q and As: ' + qandas.Items[0].id);
      alert('the count of returned q and as: ' + qandas.Count);
      // iterate over the qandas to load up questions array
    });
  }

  submitAnswer(form: NgForm) {
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

}
