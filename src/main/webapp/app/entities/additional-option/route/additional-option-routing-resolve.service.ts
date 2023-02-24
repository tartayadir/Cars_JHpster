import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAdditionalOption } from '../additional-option.model';
import { AdditionalOptionService } from '../service/additional-option.service';

@Injectable({ providedIn: 'root' })
export class AdditionalOptionRoutingResolveService implements Resolve<IAdditionalOption | null> {
  constructor(protected service: AdditionalOptionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAdditionalOption | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((additionalOption: HttpResponse<IAdditionalOption>) => {
          if (additionalOption.body) {
            return of(additionalOption.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
