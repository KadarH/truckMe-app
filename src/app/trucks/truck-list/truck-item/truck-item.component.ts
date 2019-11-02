import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Truck } from 'src/app/models/truck';
import * as fileSaver from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { DetailService } from 'src/app/services/detail.service';
import { DatePipe } from '@angular/common';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import domtoimage from 'dom-to-image';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-truck-item',
  templateUrl: './truck-item.component.html',
  styleUrls: ['./truck-item.component.scss'],
  providers: [DatePipe]
})
export class TruckItemComponent implements OnInit {

  @Input() truck: Truck;
  @Output() deleteTruck: EventEmitter<any> = new EventEmitter<any>();
  dateChoosed: string;
  step = 0;
  constructor(public datepipe: DatePipe, private voyageService: DetailService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

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
      data: 'Do you confirm the deletion of truck = ' + code
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked', result);
        this.onDelete(code);
      }
    });
  }

  onExport(id: number, date: string) {
    this.voyageService.exportVoyages(id, date = this.datepipe.transform(date, 'yyyy-MM-dd'))
    .subscribe(response => {
      this.saveFile(response.body, 'voyages_' + id + '_' + date);
      this.nextStep();
      this.snackBar.open('List Voyage Exported successfully', 'Ok', {
        duration: 4000,
      });
    }, err => {
      this.snackBar.open('There is no Voyage for this truck on this date', 'Ok', {
        duration: 4000,
      });
      this.handleError(err);
    });
  }

  onExportRecords(id: number, date: string) {
    this.voyageService.exportRecords(id, date = this.datepipe.transform(date, 'yyyy-MM-dd'))
    .subscribe(response => {
      this.saveFile(response.body, 'records_' + id + '_' + date);
      this.nextStep();
      this.snackBar.open('List Records Exported successfully', 'Ok', {
        duration: 4000,
      });
    }, err => {
      this.snackBar.open('There is no Record for this truck on this date', 'Ok', {
        duration: 4000,
      });
      this.handleError(err);
    });
  }

  saveFile(data: any, filename?: string) {
    const blob = new Blob([data], {type: 'text/csv; charset=utf-8'});
    fileSaver.saveAs(blob, filename);
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.dateChoosed = null;
    this.nextStep();
    return throwError(errorMessage);
  }

  downloadPDF() {

    const node = document.getElementById('parentdiv');

    let img;
    let filename;
    let newImage;


    domtoimage.toPng(node, { bgcolor: '#fff' })

      .then((dataUrl) => {

        img = new Image();
        img.src = dataUrl;
        newImage = img.src;

        img.onload = () => {
          const pdfWidth = img.width;
          const pdfHeight = img.height;
          // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image
          let doc;
          if (pdfWidth > pdfHeight) {
            doc = new jsPDF('l', 'px', [pdfWidth , pdfHeight]);
          } else {
            doc = new jsPDF('p', 'px', [pdfWidth , pdfHeight]);
          }
          const width = doc.internal.pageSize.getWidth();
          const height = doc.internal.pageSize.getHeight();
          doc.addImage(newImage, 'PNG',  10, 10, width, height);
          filename = 'mypdf_' + '.pdf';
          doc.save(filename);
        };

      })
      .catch((error) => {

       // Error Handling
       console.log(error);

      });



  }

}
