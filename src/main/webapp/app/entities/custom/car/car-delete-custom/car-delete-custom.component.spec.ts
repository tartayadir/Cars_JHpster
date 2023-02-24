import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDeleteCustomComponent } from './car-delete-custom.component';

describe('CarDeleteCustomComponent', () => {
  let component: CarDeleteCustomComponent;
  let fixture: ComponentFixture<CarDeleteCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarDeleteCustomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarDeleteCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
