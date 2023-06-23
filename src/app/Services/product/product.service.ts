import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: any;
  BaseUrl = 'https://ecommerceiti-heba.onrender.com/product/?limit=100';
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get('https://localhost:7118/api/products');
  }
  getTopProducts() {
    return this.http.get('https://ecommerceiti-heba.onrender.com/product/top');
  }
  getAllCategories() {
    return this.http.get('https://localhost:7118/api/categories');
  }
  createProduct(item: any) {
    return this.http.post('https://localhost:7118/api/products', item);
  }
  deleteProduct(id: any) {
    return this.http.delete(`https://localhost:7118/api/products/${id}`);
  }
  editProduct(id: any, item: any) {
    return this.http.put(`https://localhost:7118/api/products/${id}`, item);
  }
  updateImage(id: any, data: any) {
    return this.http.put(
      `https://localhost:7118/api/products/image/${id}`,
      data
    );
  }

  // upload(file: File): Observable<HttpEvent<any>> {
  //   const formData: FormData = new FormData();

  //   formData.append('file', file);

  //   const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
  //     reportProgress: true,
  //     responseType: 'json'
  //   });

  //   return this.http.request(req);
  // }

  // getFiles(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/files`);
  // }
}
