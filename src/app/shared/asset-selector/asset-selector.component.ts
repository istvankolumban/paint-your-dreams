import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Asset, AssetManagerService } from '../../services/asset-manager.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-asset-selector',
  templateUrl: './asset-selector.component.html',
  styleUrls: ['./asset-selector.component.scss'],
})
export class AssetSelectorComponent implements OnInit {
  @Output() assetSelected = new EventEmitter<Asset>();
  isModalVisible = false;
  selectedAsset: any;
  rootFolder: any;

  constructor(
    private assetManagerService: AssetManagerService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadAssets();
  }

  async loadAssets(): Promise<void> {
    this.rootFolder = await this.assetManagerService.fetchAssets();
    this.rootFolder.expanded = true;
  }

  isPdf(fileName: string): boolean {
    return fileName.toLowerCase().endsWith('.pdf');
  }

  safeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  showModal() {
    this.isModalVisible = true;
  }

  hideModal() {
    this.isModalVisible = false;
  }

  selectAsset(asset: any) {
    this.selectedAsset = asset;
  }

  saveSelection() {
    this.assetSelected.emit(this.selectedAsset);
    this.hideModal();
  }
}
