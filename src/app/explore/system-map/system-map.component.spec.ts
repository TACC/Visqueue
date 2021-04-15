import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMapComponent } from './system-map.component';

describe('SystemMapComponent', () => {
  let component: SystemMapComponent;
  let fixture: ComponentFixture<SystemMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
