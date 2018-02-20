import { Component, OnInit } from '@angular/core';
import { DynamoDbserviceService, Movie, QandA } from '../services/dynamo-dbservice';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-c2p-question',
  templateUrl: './c2p-question.component.html',
  styleUrls: ['./c2p-question.component.css']
})
export class C2pQuestionComponent implements OnInit {
  options: FormGroup;

  qandas: any = '';
  qandaArray: any = [];
  buckets: any = '';
  theBucketList: any = '';
  s3BucketName: any = '';
  getId: any;
  getCategory: any;
  getSubcategory: any;
  getQuestionType: any;
  getSelectCount: number;
  getSelectCountText: string;
  getPlural: string;
  getQuestion: any;
  getAnswers: any = [];
  getAnswerCount: number;
  getCorrectAnswer: any = [];
  getCorrectAnswerCount: number;
  updateSubcategory: any;
  updateCategory: any;
  updateQuestionType: any;
  updateQuestion: any;
  deleteSubcategory: any;
  deleteCategory: any;
  deleteQuestionType: any;
  deleteQuestion: any;
  deletedTable: any;

  constructor(private dynamoDBservice: DynamoDbserviceService, fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  ngOnInit() {
    let theReturnedJSON: any;
    theReturnedJSON = this.dynamoDBservice.getAllItems().subscribe( qandas => {
      this.qandas = JSON.stringify(qandas);
      // alert('the first returned Q and As: ' + qandas.Items[0].id);
      // alert('the count of returned q and as: ' + qandas.Count);
      // Iterate over the qandas to load up questions array.
      let counter = 0;
      const outerThis = this;
      qandas.Items.forEach(function (qandaItem) {
        outerThis.qandaArray[counter] = qandaItem;
        // alert(counter + ' ' + JSON.stringify(outerThis.qandaArray[counter]));
        counter++;
      });
      // then use a counter to step through the array elements
      this.getQuestion = this.qandaArray[0].info.question;
      this.getCategory = this.qandaArray[0].category;
      this.getId = this.qandaArray[0].id;
      this.getQuestionType = this.qandaArray[0].info.questionType;
      if (this.getQuestionType === 'multiple choice 1') {
        this.getSelectCount = 1;
        this.getPlural = '';
        this.getSelectCountText = 'one';
      } else if (this.getQuestionType === 'multiple choice 2') {
        this.getSelectCount = 2;
        this.getPlural = 's';
        this.getSelectCountText = 'two';
      } else if (this.getQuestionType === 'multiple choice 3') {
        this.getSelectCount = 3;
        this.getPlural = 's';
        this.getSelectCountText = 'three';
      } else if (this.getQuestionType === 'multiple choice 4') {
        this.getSelectCount = 4;
        this.getPlural = 's';
        this.getSelectCountText = 'four';
      } else if (this.getQuestionType === 'multiple choice 5') {
        this.getSelectCount = 5;
        this.getPlural = 's';
        this.getSelectCountText = 'five';
      }
      this.getSubcategory = this.qandaArray[0].info.subcategory;
      this.getAnswers = this.qandaArray[0].info.answers;
      this.getAnswerCount = this.qandaArray[0].info.answers.length;
      this.getCorrectAnswer = this.qandaArray[0].info.correctAnswer;
      this.getCorrectAnswerCount = this.qandaArray[0].info.correctAnswer.length;
      // as user clicks the submit button (question answered) and the next button
      // (move to the next question)
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
