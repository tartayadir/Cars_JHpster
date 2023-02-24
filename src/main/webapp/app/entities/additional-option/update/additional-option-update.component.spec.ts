import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AdditionalOptionFormService } from './additional-option-form.service';
import { AdditionalOptionService } from '../service/additional-option.service';
import { IAdditionalOption } from '../additional-option.model';
import { ICar } from 'app/entities/car/car.model';
import { CarService } from 'app/entities/car/service/car.service';

import { AdditionalOptionUpdateComponent } from './additional-option-update.component';

describe('AdditionalOption Management Update Component', () => {
  let comp: AdditionalOptionUpdateComponent;
  let fixture: ComponentFixture<AdditionalOptionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let additionalOptionFormService: AdditionalOptionFormService;
  let additionalOptionService: AdditionalOptionService;
  let carService: CarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AdditionalOptionUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(AdditionalOptionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AdditionalOptionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    additionalOptionFormService = TestBed.inject(AdditionalOptionFormService);
    additionalOptionService = TestBed.inject(AdditionalOptionService);
    carService = TestBed.inject(CarService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Car query and add missing value', () => {
      const additionalOption: IAdditionalOption = { id: 456 };
      const car: ICar = { id: 13973 };
      additionalOption.car = car;

      const carCollection: ICar[] = [{ id: 24929 }];
      jest.spyOn(carService, 'query').mockReturnValue(of(new HttpResponse({ body: carCollection })));
      const additionalCars = [car];
      const expectedCollection: ICar[] = [...additionalCars, ...carCollection];
      jest.spyOn(carService, 'addCarToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ additionalOption });
      comp.ngOnInit();

      expect(carService.query).toHaveBeenCalled();
      expect(carService.addCarToCollectionIfMissing).toHaveBeenCalledWith(carCollection, ...additionalCars.map(expect.objectContaining));
      expect(comp.carsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const additionalOption: IAdditionalOption = { id: 456 };
      const car: ICar = { id: 3512 };
      additionalOption.car = car;

      activatedRoute.data = of({ additionalOption });
      comp.ngOnInit();

      expect(comp.carsSharedCollection).toContain(car);
      expect(comp.additionalOption).toEqual(additionalOption);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAdditionalOption>>();
      const additionalOption = { id: 123 };
      jest.spyOn(additionalOptionFormService, 'getAdditionalOption').mockReturnValue(additionalOption);
      jest.spyOn(additionalOptionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ additionalOption });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: additionalOption }));
      saveSubject.complete();

      // THEN
      expect(additionalOptionFormService.getAdditionalOption).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(additionalOptionService.update).toHaveBeenCalledWith(expect.objectContaining(additionalOption));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAdditionalOption>>();
      const additionalOption = { id: 123 };
      jest.spyOn(additionalOptionFormService, 'getAdditionalOption').mockReturnValue({ id: null });
      jest.spyOn(additionalOptionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ additionalOption: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: additionalOption }));
      saveSubject.complete();

      // THEN
      expect(additionalOptionFormService.getAdditionalOption).toHaveBeenCalled();
      expect(additionalOptionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAdditionalOption>>();
      const additionalOption = { id: 123 };
      jest.spyOn(additionalOptionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ additionalOption });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(additionalOptionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCar', () => {
      it('Should forward to carService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(carService, 'compareCar');
        comp.compareCar(entity, entity2);
        expect(carService.compareCar).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
