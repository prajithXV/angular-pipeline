import { TestBed, inject } from '@angular/core/testing';

import { UserFeedbackService } from './user-feedback.service';
import {ToastrModule} from "ngx-toastr";

describe('UserFeedbackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [ UserFeedbackService ]
    });
  });

  it('should be created', inject([UserFeedbackService], (service: UserFeedbackService) => {
    expect(service).toBeTruthy();
  }));
});
