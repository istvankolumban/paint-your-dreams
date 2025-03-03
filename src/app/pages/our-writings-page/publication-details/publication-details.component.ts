import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PublicationDetailsModel } from '../our-writings.service';
import { Asset } from '../../../services/asset-manager.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-publication-details',
  templateUrl: './publication-details.component.html',
  styleUrls: ['./publication-details.component.scss'],
})
export class PublicationDetailsComponent {
  @Input()
  publication?: PublicationDetailsModel;
  @Input()
  editMode = false;

  @Output()
  save = new EventEmitter<PublicationDetailsModel>();

  @Output()
  cancel = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  onEdit() {
    this.editMode = true;
  }

  onSave() {
    if (this.publication) {
      this.save.emit(this.publication);
      this.editMode = false;
    }
  }

  onCancel() {
    this.editMode = false;
  }

  onAssetSelected(asset: Asset) {
    if (this.publication) {
      this.publication.attachment = asset;
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
