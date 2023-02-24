import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AdditionalOptionDetailComponent } from './additional-option-detail.component';

describe('AdditionalOption Management Detail Component', () => {
  let comp: AdditionalOptionDetailComponent;
  let fixture: ComponentFixture<AdditionalOptionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalOptionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ additionalOption: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AdditionalOptionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AdditionalOptionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load additionalOption on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.additionalOption).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
