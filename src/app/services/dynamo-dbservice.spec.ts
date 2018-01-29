import { TestBed, inject } from '@angular/core/testing';

import { DynamoDbserviceService } from './dynamo-dbservice';

describe('DynamoDbserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamoDbserviceService]
    });
  });

  it('should be created', inject([DynamoDbserviceService], (service: DynamoDbserviceService) => {
    expect(service).toBeTruthy();
  }));
});
