import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsuTsComponent } from './tsu-ts.component';

describe('TsuTsComponent', () => {
  let component: TsuTsComponent;
  let fixture: ComponentFixture<TsuTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsuTsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TsuTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
