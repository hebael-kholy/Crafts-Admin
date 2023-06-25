import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CouponsService } from './../../Services/coupons/coupons.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-coupon-dialog',
  templateUrl: './edit-coupon-dialog.component.html',
  styleUrls: ['./edit-coupon-dialog.component.css'],
})
export class EditCouponDialogComponent {
  formValue!: FormGroup;
  newImg: any;
  url = this.data.image;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    public couponService: CouponsService,
    public dialogRef: MatDialogRef<EditCouponDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === '-' || event.key === 'Subtract') {
      event.preventDefault();
    }
  }

  validateDiscountValue() {
    if (this.formValue.get('discount')?.value > 100) {
      this.formValue.get('discount')?.setValue(100);
    }
  }

  ngOnInit(): void {
    console.log(this.data.image);
    this.formValue = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      expire: [this.data.expireDate.substring(0, 10), Validators.required],
      discount: [this.data.discount, Validators.required],
    });
  }

  EditCoupon() {
    var coupon = {
      name: this.formValue.get('name')?.value,
      expireDate: this.formValue.get('expire')?.value,
      discount: this.formValue.get('discount')?.value,
    };

    this.isLoading = true;
    this.couponService.updateCoupon(this.data.id, coupon).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'Coupon Updated Successfully',
          showConfirmButton: true,
        });
      },
      error: (err: any) => {
        console.log(err);
        Swal.fire({
          icon: 'warning',
          title: 'Something Went Wrong!!!',
          showConfirmButton: true,
        });
      },
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
