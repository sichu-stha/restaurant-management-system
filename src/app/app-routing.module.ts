import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: "", redirectTo: "menu", pathMatch: "full"
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "orders", component: OrdersComponent
  },
  {
    path: "menu", component: MenuComponent
  },
  {
    path: "home", component: MenuComponent
  },
  {
    path: "**", component: HomeComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
