import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CouponsService {
  constructor(private myHttp: HttpClient) {}

  getAllCoupons() {
    return this.myHttp.get('https://craftsapp.azurewebsites.net/api/coupons');
  }

  addCoupon(data: any) {
    return this.myHttp.post(
      'https://craftsapp.azurewebsites.net/api/coupons',
      data
    );
  }

  updateCoupon(couponId: any, data: any) {
    return this.myHttp.put(
      'https://craftsapp.azurewebsites.net/api/coupons/' + couponId,
      data
    );
  }

  deleteCoupon(couponId: any) {
    return this.myHttp.delete(
      'https://craftsapp.azurewebsites.net/api/coupons/' + couponId
    );
  }
}
