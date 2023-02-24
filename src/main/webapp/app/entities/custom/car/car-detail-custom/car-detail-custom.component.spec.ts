import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailCustomComponent } from './car-detail-custom.component';

describe('CarDetailCustomComponent', () => {
  let component: CarDetailCustomComponent;
  let fixture: ComponentFixture<CarDetailCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarDetailCustomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarDetailCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
