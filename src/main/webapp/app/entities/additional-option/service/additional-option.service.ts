import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAdditionalOption, NewAdditionalOption } from '../additional-option.model';
import { CustomOption } from '../../custom/car/car-update-custom/car-update-custom.component';

export type PartialUpdateAdditionalOption = Partial<IAdditionalOption> & Pick<IAdditionalOption, 'id'>;

export type EntityResponseType = HttpResponse<IAdditionalOption>;
export type EntityArrayResponseType = HttpResponse<IAdditionalOption[]>;

@Injectable({ providedIn: 'root' })
export class AdditionalOptionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/additional-options');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(additionalOption: NewAdditionalOption): Observable<EntityResponseType> {
    return this.http.post<IAdditionalOption>(this.resourceUrl, additionalOption, { observe: 'response' });
  }

  update(additionalOption: IAdditionalOption): Observable<EntityResponseType> {
    return this.http.put<IAdditionalOption>(
      `${this.resourceUrl}/${this.getAdditionalOptionIdentifier(additionalOption)}`,
      additionalOption,
      { observe: 'response' }
    );
  }

  updateOptions(additionalOptions: CustomOption[]): Observable<HttpResponse<IAdditionalOption[]>> {
    additionalOptions.forEach(l => console.log(l));
    return this.http.put<IAdditionalOption[]>(`${this.resourceUrl}`, additionalOptions, { observe: 'response' });
  }

  partialUpdate(additionalOption: PartialUpdateAdditionalOption): Observable<EntityResponseType> {
    return this.http.patch<IAdditionalOption>(
      `${this.resourceUrl}/${this.getAdditionalOptionIdentifier(additionalOption)}`,
      additionalOption,
      { observe: 'response' }
    );
  }

  findByCarId(idCar: number): Observable<EntityArrayResponseType> {
    return this.http.get<IAdditionalOption[]>(`${this.resourceUrl}/car/${idCar}`, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAdditionalOption>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAdditionalOption[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  async deleteAll(additionalOptions: CustomOption[]): Promise<void> {
    await additionalOptions.forEach(option => this.delete(option.id!).subscribe());
  }

  deleteByCarID(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/car/${id}`, { observe: 'response' });
  }

  getAdditionalOptionIdentifier(additionalOption: Pick<IAdditionalOption, 'id'>): number {
    return additionalOption.id;
  }

  compareAdditionalOption(o1: Pick<IAdditionalOption, 'id'> | null, o2: Pick<IAdditionalOption, 'id'> | null): boolean {
    return o1 && o2 ? this.getAdditionalOptionIdentifier(o1) === this.getAdditionalOptionIdentifier(o2) : o1 === o2;
  }

  addAdditionalOptionToCollectionIfMissing<Type extends Pick<IAdditionalOption, 'id'>>(
    additionalOptionCollection: Type[],
    ...additionalOptionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const additionalOptions: Type[] = additionalOptionsToCheck.filter(isPresent);
    if (additionalOptions.length > 0) {
      const additionalOptionCollectionIdentifiers = additionalOptionCollection.map(
        additionalOptionItem => this.getAdditionalOptionIdentifier(additionalOptionItem)!
      );
      const additionalOptionsToAdd = additionalOptions.filter(additionalOptionItem => {
        const additionalOptionIdentifier = this.getAdditionalOptionIdentifier(additionalOptionItem);
        if (additionalOptionCollectionIdentifiers.includes(additionalOptionIdentifier)) {
          return false;
        }
        additionalOptionCollectionIdentifiers.push(additionalOptionIdentifier);
        return true;
      });
      return [...additionalOptionsToAdd, ...additionalOptionCollection];
    }
    return additionalOptionCollection;
  }
}
