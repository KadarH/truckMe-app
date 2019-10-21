import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Truck } from 'src/app/models/truck';
import { ListService } from 'src/app/services/list.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-truck-item',
  templateUrl: './truck-item.component.html',
  styleUrls: ['./truck-item.component.scss']
})
export class TruckItemComponent implements OnInit {

  @Input() truck: Truck;
  step = 0;
  @Output() deleteTruck: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, private truckService: ListService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onDelete(code: string) {
    this.deleteTruck.emit(code);
  }

  openDialog(code: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      height: '200px',
      data: 'Do you confirm the deletion of truck = ' + code
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked', result);
        // DO SOMETHING
        this.onDelete(code);
      }
    });
  }
}
