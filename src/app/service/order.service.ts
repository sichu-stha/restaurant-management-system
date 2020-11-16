import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderPaymentDTO } from 'src/models/orderPayment.dto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  saveOrder(orderPaymentDTO: OrderPaymentDTO) {
    return this.http.post(this.apiUrl+"/order/saveOrder", orderPaymentDTO);
  }

  getAllOrders() {
    return this.http.get(this.apiUrl+"/order/getOrders");
  }

  getOrderById(id) {
    return this.http.get(this.apiUrl+"/order/getOrderById?id="+id);
  }

  getTotalOrderedQuantityByItem() {
    return this.http.get(this.apiUrl+"/order/getTotalOrderedQuantityByItem");
  }
}
