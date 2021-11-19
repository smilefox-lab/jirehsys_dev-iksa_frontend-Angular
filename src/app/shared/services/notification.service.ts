import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlertComponent } from '../modules/alert/alert.component';

interface AlertIksa {
  id: number;
  property_id: number;
  end_date: string;
  cutoff_day: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, title: string = '') {
    this.toastr.success(message, title);
  }

  showError(message: string, title: string = '') {
    this.toastr.error(message, title);
  }

  showInfo(message: string, title: string = '') {
    this.toastr.info(message, title);
  }

  showWarning(message: string, title: string = '') {
    this.toastr.warning(message, title);
  }

  showAlert(data: AlertIksa) {
    const message = `Propiedad ${data.property_id} vence en ${data.cutoff_day} días. ${data.end_date}`;
    this.toastr.show(message, 'Vencimiento de contrato', {
      closeButton: true,
      toastComponent: AlertComponent,
      disableTimeOut: true,
    });
  }
}
