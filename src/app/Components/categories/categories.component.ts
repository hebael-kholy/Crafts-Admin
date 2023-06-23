import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesService } from './../../Services/categories/categories.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddCategoryDialogComponent } from './../add-category-dialog/add-category-dialog.component';
import { EditCategoryDialogComponent } from './../edit-category-dialog/edit-category-dialog.component';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['image', 'name', 'change'];

  dataSource: any = [];
  isLoading = false;
  isDeleted = false;
  isAdded = false;
  isEdited = false;
  searchText = '';

  constructor(
    public categoryService: CategoriesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  FilterChange(event: any) {
    const filterVal = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterVal;
  }

  getCategories() {
    this.isLoading = true;
    this.categoryService.getAllCategories().subscribe((res: any) => {
      console.log(res);
      // this.dataSource = res;
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addModal() {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isAdded = true;
      this.getCategories();
    });
  }

  editModal(name: any, image: any, id: any) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      width: '350px',
      data: { title: name, image: image, id: id },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isEdited = true;
      this.getCategories();
    });
  }

  deleteCategory(categoryId: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-4',
        cancelButton: 'btn btn-danger m-4',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure you want to delete?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete',
        cancelButtonText: 'No, cancel',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.categoryService.deleteCategory(categoryId).subscribe({
            next: (res: any) => {
              console.log(res);
              this.isDeleted = true;
              swalWithBootstrapButtons.fire({
                title: 'Deleted Successfully',
                icon: 'success',
                showCloseButton: true,
                showConfirmButton: false,
              });
              this.getCategories();
            },
            error: (err) => {
              console.log(err);
              Swal.fire({
                icon: 'warning',
                title: 'Something Went Wrong !!!',
                showConfirmButton: true,
              });
            },
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Delete Cancelled',
            icon: 'info',
          });
        }
      });
  }
}
