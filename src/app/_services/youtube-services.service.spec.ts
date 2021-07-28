import { TestBed } from '@angular/core/testing';

import { YoutubeServicesService } from './youtube-services.service';

describe('YoutubeServicesService', () => {
  let service: YoutubeServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YoutubeServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
