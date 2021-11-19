import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email ] ],
    });
  }

  get f() { return this.resetForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.resetForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .forgot(this.f.email.value)
      .subscribe(
        (data: any) => {
          this.router.navigate(['/auth/login']);
          this.notificationService.showSuccess((data.message ));
        },
        error => {
          this.loading = false;
          this.notificationService.showError(error);
        });
}
}
