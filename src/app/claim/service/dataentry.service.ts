import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from '../../../environments/constant';
import { BaseCrudTableService } from '../../lib/service';
import { ClaimModule } from '../claim.module';
import { DataEntry } from '../model';

@Injectable({ providedIn: ClaimModule })
export class DataEntryService extends BaseCrudTableService<DataEntry> {

  constructor(http: HttpClient) {
    super(http, `${constant.claimUrl}/dataentry`);
  }
}
