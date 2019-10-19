import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailService } from './detail.service';
import { Observable } from 'rxjs';
import { Voyage } from '../models/voyage';

@Component({
  selector: 'app-truck-detail',
  templateUrl: './truck-detail.component.html',
  styleUrls: ['./truck-detail.component.scss']
})
export class TruckDetailComponent implements OnInit, OnDestroy {

  id: number;
  private sub: any;
  voyages$: Observable<any>;
  constructor(private route: ActivatedRoute, private voyageService: DetailService) { }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe(params => {
      console.log(params.get('id'));
      this.voyages$ = this.voyageService.getVoyages(parseInt(params.get('id'), 10));
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
