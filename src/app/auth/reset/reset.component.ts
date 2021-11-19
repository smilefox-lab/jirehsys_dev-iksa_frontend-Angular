import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MustMatch } from 'src/app/shared/helper/must-match.validator';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  resetForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  token: string;

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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'password_confirmation')
  });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/dashboard';
    this.token = this.route.snapshot.params.token;
  }

  get f() { return this.resetForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.resetForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .reset(this.token, this.f.email.value, this.f.password.value, this.f.password_confirmation.value)
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.router.navigate(['/auth/login']);
          this.notificationService.showSuccess((data.message ));
        },
        error => {
          this.loading = false;
          this.notificationService.showError(error);
        });
  }
}
