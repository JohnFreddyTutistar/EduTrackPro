import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './search/search.component';
import { HelpComponent } from './pages/help/help.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( (m) => m.AuthModule)
  },
  {
    path: 'search',
    component: SearchComponent
    // loadChildren: () => import('./search/search.module').then( (m) => m.SearchModule)
  },
  {
    path: 'help',
    component: HelpComponent
  },
  
  {
    path: '**',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
