import { Component, NgZone, OnInit } from '@angular/core';
import { MenuService } from '../service/menu.service';
import { OrderService } from '../service/order.service';
import { OrderPaymentDTO } from 'src/models/orderPayment.dto';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: any;
  orderList: any;
  orders = [];
  constructor(private menuService: MenuService
    , private zone:NgZone
    , private orderService: OrderService
    , private userService: UserService
    , private router: Router) { }

  ngOnInit(): void {
    if(!this.userService.isUserAuthenticated()) {
      this.router.navigate(['login']);
      return;  
    }
    this.menuService.getAllMenus().toPromise().then(res => this.items = res);
  }

  addItemFromMenu(item) {
    let itemsOnOrder = this.orders.filter(i => i.item.id == item.id);

    if (itemsOnOrder.length == 0) {
      this.orders.push({ "item": { "id": item.id, "itemName": item.itemName }, "quantity": 1, totalPrice: item.price })
    } else {

      let price = this.items.filter(i => i.id === item.id)[0]['price'];

      if (itemsOnOrder) {
        itemsOnOrder[0]['quantity'] = itemsOnOrder[0]['quantity'] + 1;
        itemsOnOrder[0]['totalPrice'] = itemsOnOrder[0]['quantity'] * price;
      } else {
        this.orders.push(item)
      }
    }
  }

  removeItem(item) {
    let itemsOnOrder = this.orders.filter(i => i.item.id == item.id);
    if (itemsOnOrder.length == 0) return;

    let price = this.items.filter(i => i.id === item.id)[0]['price'];
    let updatedQuantity = itemsOnOrder[0]['quantity'] - 1;
    if (updatedQuantity <= 0) {
      this.orders = this.orders.filter(i => i.item.id != item.id)
    }

    itemsOnOrder[0]['quantity'] = updatedQuantity;
    itemsOnOrder[0]['totalPrice'] = itemsOnOrder[0]['quantity'] * price;
  }

  getQuantity(item) {
    if(this.orders.filter(i => i.item.id == item.id).length) {
      return this.orders.filter(i => i.item.id == item.id)[0]['quantity'];
    }
    return 0;
  }

  getTotalBill() {
    if(this.orders.length == 0) 
      return 0;
    let total = 0;
    this.orders.forEach(item => total = total + item.totalPrice);
    return total;
  }

  makePayment() {
    let userid=1;
    this.userService.getLoggedInUserId().toPromise().then(res => {
      userid = res[0]
    }).catch(err => {
      userid=1;
    })
    let order: OrderPaymentDTO =  {
      user: {
        id: userid
      },
      items: this.orders,
      billAmount : this.getTotalBill()
    };

    console.log("order to be saved:",order);

    this.orderService.saveOrder(order).toPromise().then(res => {
      console.log("Order saved");
      this.router.navigate(['/orders'])
    })
  }

  noOrders() {
    return this.getTotalBill() <= 0;
  }

  populateBill() {
    this.orderList = null;
    this.orderList = this.orders;
    console.log(this.orderList);
  }
}
