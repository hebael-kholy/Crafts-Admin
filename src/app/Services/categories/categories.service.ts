import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private myHttp: HttpClient) {}

  getAllCategories() {
    return this.myHttp.get(
      'https://craftsapp.azurewebsites.net/api/categories'
    );
  }

  addCategory(data: any) {
    return this.myHttp.post(
      'https://craftsapp.azurewebsites.net/api/categories',
      data
    );
  }

  updateCategory(categoryId: any, data: any) {
    return this.myHttp.put(
      'https://craftsapp.azurewebsites.net/api/categories/' + categoryId,
      data
    );
  }

  updateImage(categoryId: any, data: any) {
    return this.myHttp.put(
      'https://craftsapp.azurewebsites.net/api/categories/image/' + categoryId,
      data
    );
  }

  deleteCategory(categoryId: any) {
    return this.myHttp.delete(
      'https://craftsapp.azurewebsites.net/api/categories/' + categoryId
    );
  }
}
