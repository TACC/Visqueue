import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JpwTimeserieschartComponent } from './jpw-timeserieschart.component';

describe('JpwTimeserieschartComponent', () => {
  let component: JpwTimeserieschartComponent;
  let fixture: ComponentFixture<JpwTimeserieschartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JpwTimeserieschartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JpwTimeserieschartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
