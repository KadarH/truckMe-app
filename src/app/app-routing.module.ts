import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TruckListComponent } from './trucks/truck-list/truck-list.component';
import { TruckAddComponent } from './trucks/truck-add/truck-add.component';
import { TruckDetailComponent } from './trucks/truck-detail/truck-detail.component';
import { TruckEditComponent } from './trucks/truck-edit/truck-edit.component';


const routes: Routes = [
  { path: '',
    redirectTo : 'truck-list' ,
    pathMatch : 'full'
  },
  { path: 'truck-list', component : TruckListComponent },
  { path: 'truck-add', component : TruckAddComponent },
  { path: 'truck-edit/:id', component : TruckEditComponent },
  { path: 'truck-detail/:id', component : TruckDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
