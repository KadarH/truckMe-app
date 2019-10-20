import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import {MatNativeDateModule} from '@angular/material/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { TruckListComponent } from './trucks/truck-list/truck-list.component';
import { TruckAddComponent } from './trucks/truck-add/truck-add.component';
import { TruckDetailComponent } from './trucks/truck-detail/truck-detail.component';
import { TruckItemComponent } from './trucks/truck-list/truck-item/truck-item.component';
import { TruckEditComponent } from './trucks/truck-edit/truck-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    TruckListComponent,
    TruckAddComponent,
    TruckDetailComponent,
    TruckItemComponent,
    TruckEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }


platformBrowserDynamic().bootstrapModule(AppModule);
