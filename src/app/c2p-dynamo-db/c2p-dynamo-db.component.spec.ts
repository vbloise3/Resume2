import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesDynamoDbexampleComponent } from './c2p-dynamo-db.component';

describe('MoviesDynamoDbexampleComponent', () => {
  let component: MoviesDynamoDbexampleComponent;
  let fixture: ComponentFixture<MoviesDynamoDbexampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesDynamoDbexampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesDynamoDbexampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
