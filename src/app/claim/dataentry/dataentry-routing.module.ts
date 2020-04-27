import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataEntryTableComponent } from './table/dataentry-table.component';
import { DataEntryFormComponent } from './form/dataentry-form.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Menu',
    },
    children: [
      {
        path: '',
        component: DataEntryTableComponent,
        data: {
          title: 'Table',
        }
      },
      {
        path: 'add',
        component: DataEntryFormComponent,
        data: {
          title: 'Add',
          editable: true
        }
      },
      {
        path: ':id',
        children: [
          {
            path: '',
            component: DataEntryFormComponent,
            data: {
              title: 'Detail',
              editable: false
            }
          },
          {
            path: 'edit',
            component: DataEntryFormComponent,
            data: {
              title: 'Edit',
              editable: true
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataEntryRoutingModule {
}
