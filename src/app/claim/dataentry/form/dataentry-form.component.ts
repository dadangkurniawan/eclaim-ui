import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { isFieldInvalid, normalizeFlag } from '../../../util';
import { DataEntry } from '../../model';
import { DataEntryService } from '../../service';
import { icons, DataEntryIconModel } from '../dataentry-icon.model';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './dataentry-form.component.html',
})
export class DataEntryFormComponent implements OnInit {

  editable: boolean = false;
  form: FormGroup;
  icons: DataEntryIconModel[];
  claimID: number = 0;
  isFieldInvalid = isFieldInvalid;
  menuTypeahead$: Subject<string> = new Subject<string>();
  dataentry: DataEntry[] = [];
  title: string = '';
  parentMenuLoading: boolean = false;
  moduleLoading: boolean = false;

  constructor(
    private dataentryService: DataEntryService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public location: Location,

  ) {
    this.form = formBuilder.group({
      // claimID: new FormControl('', Validators.required),
      customerData: new FormControl('', Validators.required),
      facilityData: new FormControl('', Validators.required),
      brokerData: new FormControl('', Validators.required),
      insuranceCompData: new FormControl('', Validators.required),

    });
    this.icons = icons;
  }

  ngOnInit() {
    this.claimID = Number(this.activatedRoute.snapshot.paramMap.get('claimID'));
    this.title = this.activatedRoute.snapshot.data.title;
    this.editable = this.activatedRoute.snapshot.data.editable;
    this.searchDataEntry();

    if (!this.editable) {
      this.form.disable();
    }

    if (this.claimID) {
      this.dataentryService
        .get(this.claimID)
        .subscribe(data => {
          this.form.patchValue(data);

        });
    }
  }

  searchDataEntry() {
    this.menuTypeahead$
      .pipe(
        tap(() => {
          this.dataentry = [],
          this.parentMenuLoading = true;
        }),
        debounceTime(300),
        switchMap(searchText => this.dataentryService.search(searchText))
      )
      .subscribe(data => {
        this.dataentry = data;
        this.parentMenuLoading = false;
      });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }

    if (this.claimID) {
      this.dataentryService
        .edit(this.claimID, normalizeFlag(this.form))
        .subscribe(() => this.location.back());
    } else {
      this.dataentryService
        .add(normalizeFlag(this.form))
        .subscribe(() => this.location.back());
    }
  }
}
