import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosOptionsComponent } from './videos-options.component';

describe('VideosOptionsComponent', () => {
  let component: VideosOptionsComponent;
  let fixture: ComponentFixture<VideosOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideosOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
