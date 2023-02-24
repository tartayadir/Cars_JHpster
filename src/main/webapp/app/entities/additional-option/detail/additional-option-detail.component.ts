import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAdditionalOption } from '../additional-option.model';

@Component({
  selector: 'jhi-additional-option-detail',
  templateUrl: './additional-option-detail.component.html',
})
export class AdditionalOptionDetailComponent implements OnInit {
  additionalOption: IAdditionalOption | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ additionalOption }) => {
      this.additionalOption = additionalOption;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
