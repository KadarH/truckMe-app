import { Component, OnInit, Input } from '@angular/core';
import { Truck } from 'src/app/models/truck';

@Component({
  selector: 'app-truck-item',
  templateUrl: './truck-item.component.html',
  styleUrls: ['./truck-item.component.scss']
})
export class TruckItemComponent implements OnInit {

  @Input() truck: Truck;
  step = 0;

  constructor() { }

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
}
