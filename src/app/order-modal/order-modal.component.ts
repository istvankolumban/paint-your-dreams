import { Component } from '@angular/core';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss'],
  standalone: false,
})
export class OrderModalComponent {
  orderNowModal = {
    title: 'Rendelj most!',
    content:
      'Ha szeretnéd megrendelni a könyvet, kérlek vedd fel a kapcsolatot Ritával a következő elérhetőségek egyikén:<br/><br/><i class="bi bi-telephone"></i> 0740-519-728<br/><i class="bi bi-envelope"></i> kolumbanrita01@gmail.com',
  };

  onCloseOrderModal() {
    const modal = document.getElementById('orderModal');
    if (modal !== null) {
      modal.style.display = 'none';
    }
  }
}
