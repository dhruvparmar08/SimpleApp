import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatStepperModule} from '@angular/material/stepper';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';

import {LayoutModule} from '@angular/cdk/layout';

import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { MapComponent } from './map/map.component';
import { MenudetailsComponent } from './menudetails/menudetails.component';
import { MenucartComponent } from './menucart/menucart.component';
import { CartdownloadComponent } from './cartdownload/cartdownload.component';

@NgModule({
  declarations: [
    ProfileComponent,
    DashboardComponent,
    MainComponent,
    MapComponent,
    MenudetailsComponent,
    MenucartComponent,
    CartdownloadComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    MatMenuModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatBadgeModule,
    LayoutModule,
    RouterModule.forChild(
        [
            {
              path: '',
              component: MainComponent,
              children: 
              [ 
                {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
                {
                  path: 'dashboard',
                  component: MenudetailsComponent,
                  pathMatch: 'full'
                },
                {
                    path: 'profile',
                    component: ProfileComponent,
                    pathMatch: 'full'
                },
                {
                  path: 'User-details',
                  component: DashboardComponent,
                  pathMatch: 'full'
                },
                {
                  path: 'map',
                  component: MapComponent,
                  pathMatch: 'full'
                },
                {
                  path: 'cartnow',
                  component: MenucartComponent,
                  pathMatch: 'full'
                },
                {
                  path: 'download',
                  component: CartdownloadComponent,
                  pathMatch: 'full'
                },
                {
                    path: '**',
                    redirectTo: '/main/dashboard',
                    pathMatch: 'full'
                }
              ]
            },
        ]
    ),
  ],
})
export class MainModule { }
