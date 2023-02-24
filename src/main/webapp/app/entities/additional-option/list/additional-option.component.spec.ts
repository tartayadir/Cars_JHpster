import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AdditionalOptionService } from '../service/additional-option.service';

import { AdditionalOptionComponent } from './additional-option.component';

describe('AdditionalOption Management Component', () => {
  let comp: AdditionalOptionComponent;
  let fixture: ComponentFixture<AdditionalOptionComponent>;
  let service: AdditionalOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'additional-option', component: AdditionalOptionComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [AdditionalOptionComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(AdditionalOptionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AdditionalOptionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AdditionalOptionService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.additionalOptions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to additionalOptionService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getAdditionalOptionIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getAdditionalOptionIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
