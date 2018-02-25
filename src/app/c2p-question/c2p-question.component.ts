import { Component, OnInit } from '@angular/core';
import { DynamoDbserviceService, Movie, QandA, Answer } from '../services/dynamo-dbservice';
import { NgForm, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatCheckbox } from '@angular/material';
import { NgClass } from '@angular/common';

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
  getTextAnswer: any;
  textAnswerCorrectOrNot: string = 'neutral';
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
  selectedValue = [];
  nextQuestion = false;
  correctOrNot = [];

  constructor(private dynamoDBservice: DynamoDbserviceService, fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: false,
      selectedAnswer: 'auto',
      tc: new FormControl(),
      textAnswer: new FormControl(),
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
    if (this.getSelectCount === 0) {
      // alert('the entered answer: ' + JSON.stringify(theQanda));
      // trim leading and trailing spaces
      const trimedAnswer = theQanda.textAnswer.trim();
      if (trimedAnswer === this.qandaArray[this.currentQuestion].info.correctAnswer[0]) {
        this.textAnswerCorrectOrNot = 'true';
        // alert('correct answer! ' + this.qandaArray[this.currentQuestion].info.correctAnswer[0]);
      } else {
        this.textAnswerCorrectOrNot = 'false';
        // alert('wrong answer. Correct answer: ' + this.qandaArray[this.currentQuestion].info.correctAnswer[0]);
      }
      this.getTextAnswer = this.qandaArray[this.currentQuestion].info.correctAnswer[0];
    }
    if (this.getSelectCount === 1) {
      if (theQanda.selectedAnswer === this.qandaArray[this.currentQuestion].info.correctAnswer[0]) {
        // alert('correct answer! ' + this.qandaArray[this.currentQuestion].info.correctAnswer[0]);
        const currentThis = this;
        let counter = 0;
        this.qandaArray[this.currentQuestion].info.answers.forEach( function (answer) {
          if ( ( currentThis.qandaArray[currentThis.currentQuestion].info.correctAnswer.indexOf(answer) > -1) ) {
            currentThis.correctOrNot[counter] = true;
          } else {
            currentThis.correctOrNot[counter] = false;
          }
          // alert('correct? ' + currentThis.correctOrNot[counter]);
          counter++;
        });
        this.getAnswers = this.qandaArray[this.currentQuestion].info.answers;
      } else {
        // alert('wrong answer. Correct answer: ' + this.qandaArray[this.currentQuestion].info.correctAnswer[0]);
        const currentThis = this;
        let counter = 0;
        this.qandaArray[this.currentQuestion].info.answers.forEach( function (answer) {
          if ( ( currentThis.qandaArray[currentThis.currentQuestion].info.correctAnswer.indexOf(answer) > -1) ) {
            currentThis.correctOrNot[counter] = true;
          } else {
            currentThis.correctOrNot[counter] = false;
          }
          // alert('correct? ' + currentThis.correctOrNot[counter]);
          counter++;
        });
        this.getAnswers = this.qandaArray[this.currentQuestion].info.answers;
      }
    } else if (this.getSelectCount === 2) {
      if ( ( this.qandaArray[this.currentQuestion].info.correctAnswer.indexOf(this.selectedValue[0]) > -1 )
        && ( this.qandaArray[this.currentQuestion].info.correctAnswer.indexOf(this.selectedValue[1]) > -1 ) ) {
        // alert('correct answer! ' + this.qandaArray[this.currentQuestion].info.correctAnswer[0] + '; '
        //  + this.qandaArray[this.currentQuestion].info.correctAnswer[1]);
        // highlight correct answer green
        // set the correctOrNot array
        const currentThis = this;
        let counter = 0;
        this.qandaArray[this.currentQuestion].info.answers.forEach( function (answer) {
          if ( ( currentThis.qandaArray[currentThis.currentQuestion].info.correctAnswer.indexOf(answer) > -1) ) {
            currentThis.correctOrNot[counter] = true;
          } else {
            currentThis.correctOrNot[counter] = false;
          }
          // alert('correct? ' + currentThis.correctOrNot[counter]);
          counter++;
        });
        this.getAnswers = this.qandaArray[this.currentQuestion].info.answers;
      } else {
        // alert('wrong answer. Correct answer: ' + this.qandaArray[this.currentQuestion].info.correctAnswer[0] + '; '
        //  + this.qandaArray[this.currentQuestion].info.correctAnswer[1]);
        const currentThis = this;
        let counter = 0;
        this.qandaArray[this.currentQuestion].info.answers.forEach( function (answer) {
          if ( ( currentThis.qandaArray[currentThis.currentQuestion].info.correctAnswer.indexOf(answer) > -1) ) {
            currentThis.correctOrNot[counter] = true;
          } else {
            currentThis.correctOrNot[counter] = false;
          }
          // alert('correct? ' + currentThis.correctOrNot[counter]);
          counter++;
        });
        this.getAnswers = this.qandaArray[this.currentQuestion].info.answers;
      }
    } else if (this.getSelectCount === 3) {
      if ( ( this.qandaArray[this.currentQuestion].info.correctAnswer.indexOf(this.selectedValue[0]) > -1 )
        && ( this.qandaArray[this.currentQuestion].info.correctAnswer.indexOf(this.selectedValue[1]) > -1 )
        && ( this.qandaArray[this.currentQuestion].info.correctAnswer.indexOf(this.selectedValue[2]) > -1 ) ) {
        // alert('correct answer! ' + this.qandaArray[this.currentQuestion].info.correctAnswer[0] + '; '
        // + this.qandaArray[this.currentQuestion].info.correctAnswer[1] + '; '
        //  + this.qandaArray[this.currentQuestion].info.correctAnswer[2] );
        const currentThis = this;
        let counter = 0;
        this.qandaArray[this.currentQuestion].info.answers.forEach( function (answer) {
          if ( ( currentThis.qandaArray[currentThis.currentQuestion].info.correctAnswer.indexOf(answer) > -1) ) {
            currentThis.correctOrNot[counter] = true;
          } else {
            currentThis.correctOrNot[counter] = false;
          }
          // alert('correct? ' + currentThis.correctOrNot[counter]);
          counter++;
        });
        this.getAnswers = this.qandaArray[this.currentQuestion].info.answers;
      } else {
        // alert('wrong answer. Correct answer: ' + this.qandaArray[this.currentQuestion].info.correctAnswer[0] + '; '
        //  + this.qandaArray[this.currentQuestion].info.correctAnswer[1] + '; '
        //  + this.qandaArray[this.currentQuestion].info.correctAnswer[2]
        // );
        const currentThis = this;
        let counter = 0;
        this.qandaArray[this.currentQuestion].info.answers.forEach( function (answer) {
          if ( ( currentThis.qandaArray[currentThis.currentQuestion].info.correctAnswer.indexOf(answer) > -1) ) {
            currentThis.correctOrNot[counter] = true;
          } else {
            currentThis.correctOrNot[counter] = false;
          }
          // alert('correct? ' + currentThis.correctOrNot[counter]);
          counter++;
        });
        this.getAnswers = this.qandaArray[this.currentQuestion].info.answers;
      }
    }
    if (!this.nextQuestion) {
      // draw pie showing correct versus incorrect so far
      this.nextQuestion = true;
    } else {
      this.currentQuestion = this.currentQuestion + 1;
      if (this.currentQuestion === this.qandaArray.length) {
        // start over
        this.currentQuestion = 0;
      }
      // transition form button to next question
      this.nextQuestion = false;
      const currentThis = this;
      let counter = 0;
      this.qandaArray[this.currentQuestion].info.answers.forEach( function (answer) {
        currentThis.correctOrNot[counter] = false;
        counter++;
      });
      this.options.patchValue({
        textAnswer: ''
      });
      // theQanda.textAnswer = '';
      this.textAnswerCorrectOrNot = 'neutral';
      this.getScreenElements();
    }
  }

  change(e, type) {
    console.log(e.checked);
    console.log(type);
    if (e.checked) {
      this.selectedValue.push(type);
    } else {
      let updateItem = this.selectedValue.find(this.findIndexToUpdate, type);
      let index = this.selectedValue.indexOf(updateItem);
      this.selectedValue.splice(index, 1);
    }
  }

  findIndexToUpdate (type) {
    return type === this;
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
    } else if (this.getQuestionType === 'text entry') {
      this.getSelectCount = 0;
      this.getPlural = '';
      this.getSelectCountText = 'one';
    }
    this.getSubcategory = this.qandaArray[this.currentQuestion].info.subcategory;
    this.getAnswers = this.qandaArray[this.currentQuestion].info.answers;
    this.getAnswerCount = this.qandaArray[this.currentQuestion].info.answers.length;
    this.getCorrectAnswer = this.qandaArray[this.currentQuestion].info.correctAnswer;
    this.getCorrectAnswerCount = this.qandaArray[this.currentQuestion].info.correctAnswer.length;
    // set the checkbox to false on load of new question
    this.options.setValue({tc: false, hideRequired: false, selectedAnswer: 'auto', textAnswer: ' '});
    // clear the selected values
    while (this.selectedValue.length > 0) {
      this.selectedValue.pop();
    }
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
    this.user.isTCAccepted = this.options.get('1').value;
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
