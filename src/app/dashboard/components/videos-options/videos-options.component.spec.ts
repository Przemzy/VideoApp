import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosOptionsComponent } from './videos-options.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {RouterTestingModule} from "@angular/router/testing";

describe('VideosOptionsComponent', () => {
  let component: VideosOptionsComponent;
  let fixture: ComponentFixture<VideosOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideosOptionsComponent ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule
      ]
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
