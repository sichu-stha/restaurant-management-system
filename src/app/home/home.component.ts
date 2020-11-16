import { OrderService } from './../service/order.service';
import { Observable, of} from 'rxjs';
import { DataModel } from './../../models/data.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { map } from 'd3';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  barChartData:Observable<DataModel>;

  constructor(private userService: UserService
    , private orderService: OrderService
    , private router: Router) { }

  ngOnInit(): void {
    if(!this.userService.isUserAuthenticated())
      this.router.navigate(['login']);
      // this.barChartData.subscribe(this.orderService.getTotalOrderedQuantityByItem().
      // subscribe((data:DataModel) => {
      //   console.log(data);
      //   return data;
      // });    
  }

}
