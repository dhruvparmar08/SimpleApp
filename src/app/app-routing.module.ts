import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { MainGuard } from './services/main.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch:'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule', canActivate: [AuthGuard]},
  { path: 'main', loadChildren: './main/main.module#MainModule', canActivate: [MainGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
