import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsusageComponent } from './tsusage.component';

describe('TsusageComponent', () => {
  let component: TsusageComponent;
  let fixture: ComponentFixture<TsusageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsusageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TsusageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
