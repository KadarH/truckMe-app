import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Truck } from 'src/app/models/truck';
import { ListService } from 'src/app/services/list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-truck-item',
  templateUrl: './truck-item.component.html',
  styleUrls: ['./truck-item.component.scss']
})
export class TruckItemComponent implements OnInit {

  @Input() truck: Truck;
  step = 0;
  @Output() deleteTruck: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, private truckService: ListService) { }

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
}
