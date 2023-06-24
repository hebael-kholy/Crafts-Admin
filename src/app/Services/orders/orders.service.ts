import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private myHttp: HttpClient) {}

  getAllOrders() {
    return this.myHttp.get('https://craftsapp.azurewebsites.net/api/orders');
  }

  getAllUsers() {
    return this.myHttp.get('https://craftsapp.azurewebsites.net/api/users');
  }

  cancelOrder(orderId: any) {
    return this.myHttp.put(
      'https://craftsapp.azurewebsites.net/api/orders/cancelorder/' + orderId,
      ''
    );
  }

  acceptOrder(orderId: any) {
    return this.myHttp.put(
      'https://craftsapp.azurewebsites.net/api/orders/acceptorder/' + orderId,
      ''
    );
  }
  // getLastOrders() {
  //   return this.myHttp.get(
  //     'https://ecommerceiti-heba.onrender.com/order/admin/top'
  //   );
  // }
}
