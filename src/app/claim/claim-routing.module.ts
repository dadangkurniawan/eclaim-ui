import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Claim',
    },
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dataentry',
        loadChildren: () => import('./dataentry/dataentry.module').then(mod => mod.DataEntryModule)
      },
      {
        path: 'organization',
        loadChildren: () => import('../admin/organization/organization.module').then(mod => mod.OrganizationModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimRoutingModule {}
