import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClaimSharedModule } from '../shared/claim-shared.module';
import { DataEntryFormComponent } from './form/dataentry-form.component';
import { DataEntryRoutingModule } from './dataentry-routing.module';
import { DataEntryTableComponent } from './table/dataentry-table.component';

@NgModule({
  declarations: [
    DataEntryFormComponent,
    DataEntryTableComponent
  ],
  imports: [
    CommonModule,
    DataEntryRoutingModule,
    ClaimSharedModule
  ]
})
export class DataEntryModule {}
