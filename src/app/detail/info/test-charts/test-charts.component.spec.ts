import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestChartsComponent } from './test-charts.component';

describe('TestChartsComponent', () => {
  let component: TestChartsComponent;
  let fixture: ComponentFixture<TestChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
