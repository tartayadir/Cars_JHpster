import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, Observable, Subject, switchMap, tap } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { CarService, EntityArrayResponseType } from '../entities/car/service/car.service';
import { ICar } from '../entities/car/car.model';
import { SortService } from '../shared/sort/sort.service';
import { ASC, DEFAULT_SORT_DATA, DESC, SORT } from '../config/navigation.constants';
import { CarBrand } from '../entities/enumerations/car-brand.model';
import { CarDeleteCustomComponent } from '../entities/custom/car/car-delete-custom/car-delete-custom.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private carBrandValues = Object.values(CarBrand);
  private carBrandKeys = Object.keys(CarBrand);

  account: Account | null = null;
  cars: ICar[] = [];
  isReadMore: boolean[] = [];
  isLoading = false;

  predicate = 'id';
  ascending = true;

  bucketURL: string = 'https://d3t4g72htdika4.cloudfront.net/';

  private readonly destroy$ = new Subject<void>();

  constructor(
    private accountService: AccountService,
    private router: Router,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute,
    protected sortService: SortService,
    protected carService: CarService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.load();

    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => {
        this.account = account;
      });
  }

  load(): void {
    this.loadFromBackendWithRouteInformation().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });
  }

  getImageURL(car: ICar): string {
    return this.bucketURL + car.imageFileId;
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.cars = this.refineData(dataFromBody);
    this.cars.forEach(value => this.isReadMore.push(true));
  }

  protected refineData(data: ICar[]): ICar[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected fillComponentAttributesFromResponseBody(data: ICar[] | null): ICar[] {
    return data ?? [];
  }

  protected loadFromBackendWithRouteInformation(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackend(this.predicate, this.ascending))
    );
  }

  protected queryBackend(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject = {
      sort: this.getSortQueryParam(predicate, ascending),
    };
    return this.carService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA])!.split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  showText(i: number): void {
    this.isReadMore[i] = !this.isReadMore[i];
  }

  getCarBrand(i: number): string {
    return this.carBrandValues[this.carBrandKeys.indexOf(this.cars[i].carBrand! as string)];
  }

  delete(car: ICar): void {
    const modalRef = this.modalService.open(CarDeleteCustomComponent, { backdrop: 'static' });
    modalRef.componentInstance.car = car;
  }
}
