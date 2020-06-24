import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterAdminHomePage } from './master-admin-home.page';

const routes: Routes = [
  {
    path: '',
    component: MasterAdminHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterAdminHomePageRoutingModule {}
