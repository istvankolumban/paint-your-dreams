import { Component, OnInit } from '@angular/core';
import { Asset, Folder, AssetManagerService } from '../../services/asset-manager.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-asset-manager',
  templateUrl: './asset-manager.component.html',
  styleUrls: ['./asset-manager.component.scss'],
})
export class AssetManagerComponent implements OnInit {
  rootFolder: Folder | null = null;
  selectedAsset: Asset | null = null;

  constructor(private assetManagerService: AssetManagerService, private sanitizer: DomSanitizer) {}

  async ngOnInit() {
    try {
      this.rootFolder = await this.assetManagerService.fetchAssets();
      console.log(this.rootFolder);
      this.rootFolder.expanded = true;
    } catch (error) {
      console.error('Failed to fetch assets:', error);
    }
  }

  selectImage(asset: Asset) {
    this.selectedAsset = asset;
  }

  isPdf(url: string): boolean {
    return url.endsWith('.pdf');
  }

  safeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
