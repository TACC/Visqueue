import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsperweekComponent } from './jobsperweek.component';

describe('JobsperweekComponent', () => {
  let component: JobsperweekComponent;
  let fixture: ComponentFixture<JobsperweekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsperweekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsperweekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
