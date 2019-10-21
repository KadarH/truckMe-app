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

  trucks$: Truck[];
  constructor(private truckListService: ListService) { }

  ngOnInit() {
    this.truckListService.getTrucks().subscribe((data: Truck[]) => {
      this.trucks$ = data;
    });
  }

  onDeleteTruck(event: string) {
    console.log(event);
    this.truckListService.deleteTruck(event).subscribe((data: Truck[]) => {
      console.log(data);
      this.trucks$ = data;
    });
  }

}
