import { TestBed, inject } from '@angular/core/testing';

import { UserFeedbackService } from './user-feedback.service';
import {ToastOptions, ToastsManager} from "ng2-toastr";

describe('UserFeedbackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ UserFeedbackService, ToastsManager, ToastOptions ]
    });
  });

  it('should be created', inject([UserFeedbackService], (service: UserFeedbackService) => {
    expect(service).toBeTruthy();
  }));
});
