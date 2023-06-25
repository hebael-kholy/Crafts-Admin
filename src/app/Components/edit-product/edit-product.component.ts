import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Data } from '@angular/router';
import { ProductService } from 'src/app/Services/product/product.service';
import Swal from 'sweetalert2';
import { DialogData } from '../add-product-dialog/add-product-dialog.component';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  base64: any = '';
  form!: FormGroup;
  categories: [] | any = [];
  selectedFile!: File;
  url = this.data.image;
  categoryName = this.data.categoryName;
  categoryId = this.data.categoryId;
  isSale = this.data.isSale;
  defaultCatId: any;
  myFormControl = new FormControl(this.data.price, [Validators.min(1)]);
  myFormControlQuantity = new FormControl(this.data.quantity, [
    Validators.min(1),
  ]);

  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Service: ProductService,
    private build: FormBuilder,
    private http: HttpClient,
    private router: ActivatedRoute
  ) {}

  onKeyDown(event: KeyboardEvent) {
    if (event.key === '-' || event.key === 'Subtract') {
      event.preventDefault();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  uploadImgFile(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.url = e.target.result;
      };
    }
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({
      image: file,
    });
    this.form.get('image')?.updateValueAndValidity();
  }

  getCatergory() {
    this.Service.getAllCategories().subscribe((res: any) => {
      this.categories = res;
      console.log(this.categories);
      //console.log(this.categories[2]._id);
    });
  }

  getSelectedCateory(event: any) {
    console.log(event.target.value);
    this.form.get('categoryId')!.setValue(event.target.value);
    //console.log(this.form);
  }

  getSelectedSale(event: any) {
    console.log(event.target.value);
    this.form.get('isSale')!.setValue(event.target.value);
  }

  ngOnInit(): void {
    console.log(this.data.image);
    this.form = this.build.group({
      productId: [this.data.productId],
      title: [this.data.title],
      price: [this.data.price, Validators.min(1)],
      image: [null],
      quantity: [this.data.quantity, Validators.min(1)],
      isSale: [this.data.isSale],
      description: [this.data.description],
      categoryId: [this.data.categoryId],
    });

    if (this.form.get('categoryId')!.value == 0) {
      this.form.get('categoryId')!.setValue(this.data.categoryId);
      this.defaultCatId = this.form.get('categoryId')!.value;
    }
    console.log(this.form.get('categoryId')!.value);

    //console.log(this.data);
    this.getCatergory();
    this.getSelectedCateory(event);
    // this.getSelectedSale(event);
  }

  openFile() {
    document.getElementById('exampleInputImage')?.click();
  }

  updateprodImg() {
    var formData: any = new FormData();
    formData.append('image', this.form.get('image')?.value);

    if (this.form.get('image')?.value != null) {
      this.isLoading = true;
      this.Service.updateImage(this.data.productId, formData).subscribe({
        next: (res: any) => {
          console.log(res);
          this.data.image = res.productImgAddDto.image.fileName;
          this.isLoading = false;
          this.dialogRef.close();
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            icon: 'warning',
            title: 'Something Went Wrong!!!',
            showConfirmButton: true,
          });
        },
      });
    }
  }

  isLoading = false;
  Save() {
    this.isLoading = true;
    let title = this.form.get('title')?.value;
    let price = this.form.get('price')?.value;
    let quantity = this.form.get('quantity')?.value;
    let isSale = JSON.parse(this.form.get('isSale')?.value);
    let description = this.form.get('description')?.value;
    let cat = this.form.get('categoryId')?.value;

    let product = {
      title: title,
      price: price,
      quantity: quantity,
      isSale: isSale,
      description: description,
      categoryId: cat,
    };

    this.Service.editProduct(this.data.productId, product).subscribe({
      next: (res) => {
        console.log(res);
        console.log(isSale);
        this.updateprodImg();
        this.isLoading = false;
        Swal.fire('Product Updated successfully', '', 'success');
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        Swal.fire({
          icon: 'warning',
          title: 'Something Went Wrong!!!',
          showConfirmButton: true,
        });
      },
    });
    //this.updateprodImg();
  }
}
