import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyTakerHomePage } from './survey-taker-home.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyTakerHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyTakerHomePageRoutingModule {}
