import { Component, OnInit } from '@angular/core';
import { DynamoDbserviceService, Movie, QandA } from '../services/dynamo-dbservice';
import { NgForm, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatCheckbox } from '@angular/material';

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
  currentQuestion = 0;
  updateSubcategory: any;
  updateCategory: any;
  updateQuestionType: any;
  updateQuestion: any;
  deleteSubcategory: any;
  deleteCategory: any;
  deleteQuestionType: any;
  deleteQuestion: any;
  deletedTable: any;
  user = new User();

  constructor(private dynamoDBservice: DynamoDbserviceService, fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: false,
      selectedAnswer: 'auto',
      tc: new FormControl()
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
      // then use a counter to step through the array elements, after shuffling the array
      this.shuffle(this.qandaArray);
      this.getScreenElements();
      // as user clicks the submit button (question answered) and the next button
      // (move to the next question)
    });
  }

  submitAnswer(form: NgForm) {
    const theQanda = form.value;
    // alert('the selected answer: ' + theQanda.selectedAnswer);
    // logic to check selected answer with correct answer
    // need to figure out how to check multiple answers
    if (theQanda.selectedAnswer === this.qandaArray[this.currentQuestion].info.correctAnswer[0]) {
      alert('correct answer! ' + this.qandaArray[this.currentQuestion].info.correctAnswer[0]);
    } else {
      alert('wrong answer. Correct answer: ' + this.qandaArray[this.currentQuestion].info.correctAnswer[0]);
    }
    // test for checkboxes, replace with real logic
    if (this.getSelectCount === 2) {
      this.onChkChange(form);
    }
    // highlight correct answer
    // draw pie showing correct versus incorrect so far
    this.currentQuestion = this.currentQuestion + 1;
    // transition form button to next question
    this.getScreenElements();
  }

  submitAnswerOld(form: NgForm) {
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
      if (this.getSelectCount = 2) {
        this.onChkChange(form);
      }
      // alert('component initialDataLoad result before HTML display: ' + this.qandas);
    });
  }

  getScreenElements() {
    this.getQuestion = this.qandaArray[this.currentQuestion].info.question;
    this.getCategory = this.qandaArray[this.currentQuestion].category;
    this.getId = this.qandaArray[this.currentQuestion].id;
    this.getQuestionType = this.qandaArray[this.currentQuestion].info.questionType;
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
    this.getSubcategory = this.qandaArray[this.currentQuestion].info.subcategory;
    this.getAnswers = this.qandaArray[this.currentQuestion].info.answers;
    this.getAnswerCount = this.qandaArray[this.currentQuestion].info.answers.length;
    this.getCorrectAnswer = this.qandaArray[this.currentQuestion].info.correctAnswer;
    this.getCorrectAnswerCount = this.qandaArray[this.currentQuestion].info.correctAnswer.length;
    // set the checkbox to false on load of new question
    this.options.setValue({tc: false, hideRequired: false, selectedAnswer: 'auto'});
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  onChkChange(form: NgForm) {
    let message: string = '';
    this.user.isTCAccepted = this.options.get('tc').value;
    if ( this.user.isTCAccepted ) {
      message = 'Accepted';
    } else {
      message = 'Not Accepted';
    }
    alert('Checked value changed: user is tc accepted? ' + message);
  }

}

export class User {
  userName: string;
  isMarried: boolean = false;
  isTCAccepted: boolean;
}
