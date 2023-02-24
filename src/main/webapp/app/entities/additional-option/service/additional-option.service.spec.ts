import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAdditionalOption } from '../additional-option.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../additional-option.test-samples';

import { AdditionalOptionService } from './additional-option.service';

const requireRestSample: IAdditionalOption = {
  ...sampleWithRequiredData,
};

describe('AdditionalOption Service', () => {
  let service: AdditionalOptionService;
  let httpMock: HttpTestingController;
  let expectedResult: IAdditionalOption | IAdditionalOption[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AdditionalOptionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a AdditionalOption', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const additionalOption = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(additionalOption).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AdditionalOption', () => {
      const additionalOption = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(additionalOption).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AdditionalOption', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AdditionalOption', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AdditionalOption', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAdditionalOptionToCollectionIfMissing', () => {
      it('should add a AdditionalOption to an empty array', () => {
        const additionalOption: IAdditionalOption = sampleWithRequiredData;
        expectedResult = service.addAdditionalOptionToCollectionIfMissing([], additionalOption);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(additionalOption);
      });

      it('should not add a AdditionalOption to an array that contains it', () => {
        const additionalOption: IAdditionalOption = sampleWithRequiredData;
        const additionalOptionCollection: IAdditionalOption[] = [
          {
            ...additionalOption,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAdditionalOptionToCollectionIfMissing(additionalOptionCollection, additionalOption);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AdditionalOption to an array that doesn't contain it", () => {
        const additionalOption: IAdditionalOption = sampleWithRequiredData;
        const additionalOptionCollection: IAdditionalOption[] = [sampleWithPartialData];
        expectedResult = service.addAdditionalOptionToCollectionIfMissing(additionalOptionCollection, additionalOption);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(additionalOption);
      });

      it('should add only unique AdditionalOption to an array', () => {
        const additionalOptionArray: IAdditionalOption[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const additionalOptionCollection: IAdditionalOption[] = [sampleWithRequiredData];
        expectedResult = service.addAdditionalOptionToCollectionIfMissing(additionalOptionCollection, ...additionalOptionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const additionalOption: IAdditionalOption = sampleWithRequiredData;
        const additionalOption2: IAdditionalOption = sampleWithPartialData;
        expectedResult = service.addAdditionalOptionToCollectionIfMissing([], additionalOption, additionalOption2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(additionalOption);
        expect(expectedResult).toContain(additionalOption2);
      });

      it('should accept null and undefined values', () => {
        const additionalOption: IAdditionalOption = sampleWithRequiredData;
        expectedResult = service.addAdditionalOptionToCollectionIfMissing([], null, additionalOption, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(additionalOption);
      });

      it('should return initial array if no AdditionalOption is added', () => {
        const additionalOptionCollection: IAdditionalOption[] = [sampleWithRequiredData];
        expectedResult = service.addAdditionalOptionToCollectionIfMissing(additionalOptionCollection, undefined, null);
        expect(expectedResult).toEqual(additionalOptionCollection);
      });
    });

    describe('compareAdditionalOption', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAdditionalOption(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAdditionalOption(entity1, entity2);
        const compareResult2 = service.compareAdditionalOption(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAdditionalOption(entity1, entity2);
        const compareResult2 = service.compareAdditionalOption(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAdditionalOption(entity1, entity2);
        const compareResult2 = service.compareAdditionalOption(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
