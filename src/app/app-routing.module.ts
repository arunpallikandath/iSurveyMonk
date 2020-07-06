import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {ContactComponent} from './components/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'master-admin-home',
    loadChildren: () => import('./pages/master-admin-home/master-admin-home.module').then(m => m.MasterAdminHomePageModule)
  },
  {
    path: 'master-admin/company_management',
    loadChildren: () => import('./pages/company-management/company-management.module').then(m => m.CompanyManagementPageModule)
  },
  {
    path: 'survey-admin-home',
    loadChildren: () => import('./pages/survey-admin-home/survey-admin-home.module').then( m => m.SurveyAdminHomePageModule)
  },
  {
    path: 'survey-taker-home',
    loadChildren: () => import('./pages/survey-taker-home/survey-taker-home.module').then( m => m.SurveyTakerHomePageModule)
  },
  {
    path: 'survey-manager-home',
    loadChildren: () => import('./pages/survey-manager-home/survey-manager-home.module').then( m => m.SurveyManagerHomePageModule)
  },
  {
    path: 'company-management',
    loadChildren: () => import('./pages/company-management/company-management.module').then( m => m.CompanyManagementPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
