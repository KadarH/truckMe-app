import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Truck } from '../../models/truck';
import { ListService } from '../../services/list.service';
@Component({
  selector: 'app-truck-list',
  templateUrl: './truck-list.component.html',
  styleUrls: ['./truck-list.component.scss']
})
export class TruckListComponent implements OnInit {

  trucks$: Observable<any>;
  constructor(private truckListService: ListService) { }

  ngOnInit() {
    this.trucks$ = this.truckListService.getTrucks();
  }

  onDeleteTruck(event: string) {
    console.log(event);
    this.trucks$  = this.truckListService.deleteTruck(event);
  }

}
