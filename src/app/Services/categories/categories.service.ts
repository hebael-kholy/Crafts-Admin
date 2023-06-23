import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private myHttp: HttpClient) {}

  getAllCategories() {
    return this.myHttp.get('https://localhost:7118/api/categories');
  }

  addCategory(data: any) {
    return this.myHttp.post('https://localhost:7118/api/categories', data);
  }

  updateCategory(categoryId: any, data: any) {
    return this.myHttp.put(
      'https://localhost:7118/api/categories/' + categoryId,
      data
    );
  }

  updateImage(categoryId: any, data: any) {
    return this.myHttp.put(
      'https://localhost:7118/api/categories/image/' + categoryId,
      data
    );
  }

  deleteCategory(categoryId: any) {
    return this.myHttp.delete(
      'https://localhost:7118/api/categories/' + categoryId
    );
  }
}
