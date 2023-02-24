import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarUpdateCustomComponent } from './car-update-custom.component';

describe('CarUpdateCustomComponent', () => {
  let component: CarUpdateCustomComponent;
  let fixture: ComponentFixture<CarUpdateCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarUpdateCustomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarUpdateCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
