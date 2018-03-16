import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ca2QuestionComponent } from './ca2-question.component';

describe('Ca2QuestionComponent', () => {
  let component: Ca2QuestionComponent;
  let fixture: ComponentFixture<Ca2QuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ca2QuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ca2QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
