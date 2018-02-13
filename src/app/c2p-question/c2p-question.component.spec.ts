import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { C2pQuestionComponent } from './c2p-question.component';

describe('C2pQuestionComponent', () => {
  let component: C2pQuestionComponent;
  let fixture: ComponentFixture<C2pQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ C2pQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(C2pQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
