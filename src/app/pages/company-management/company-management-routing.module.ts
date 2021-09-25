import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyManagementPage } from './company-management.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyManagementPageRoutingModule {}
