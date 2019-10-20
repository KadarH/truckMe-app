import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListService } from 'src/app/services/list.service';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Truck } from 'src/app/models/truck';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-truck-add',
  templateUrl: './truck-add.component.html',
  styleUrls: ['./truck-add.component.scss']
})
export class TruckAddComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  isLoadingResults = false;
  truckForm: FormGroup;
  truck = {
    name : ['', Validators.required],
    groupe : [null, Validators.required],
    description : [null, Validators.required],
    code : [null, Validators.required]
  };

  constructor(private router: Router, private api: ListService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.truckForm = this.formBuilder.group(this.truck);
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addTruck(this.truckForm.value)
      .subscribe((res: any) => {
          this.isLoadingResults = false;
          this.router.navigate(['/truck-list']);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
