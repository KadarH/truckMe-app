import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TruckListComponent } from './truck-list/truck-list.component';
import { TruckAddComponent } from './truck-add/truck-add.component';


const routes: Routes = [
  { path: '',
    redirectTo : 'truck-list' ,
    pathMatch : 'full'
  },
  { path: 'truck-list', component : TruckListComponent },
  { path: 'truck-add', component : TruckAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
