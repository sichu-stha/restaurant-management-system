import { Item } from './../../models/item.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input() 
  public orderId: Object;

  order:any;
  public gridData:any =[];
  constructor(private orderService: OrderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderService.getOrderById(this.orderId).toPromise().then(res => this.order = res)
  }

}
