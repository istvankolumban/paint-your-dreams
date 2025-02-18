import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  currentFolder: Folder | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef;

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

  async createFolder(parentFolder: Folder) {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      try {
        await this.assetManagerService.createFolder(parentFolder, folderName);
        this.rootFolder = await this.assetManagerService.fetchAssets();
      } catch (error) {
        console.error('Failed to create folder:', error);
      }
    }
  }

  setCurrentFolder(folder: Folder) {
    this.currentFolder = folder;
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0 && this.currentFolder) {
      const file = input.files[0];
      try {
        await this.assetManagerService.uploadAsset(this.currentFolder, file);
        this.rootFolder = await this.assetManagerService.fetchAssets();
      } catch (error) {
        console.error('Failed to upload asset:', error);
      }
    }
  }
}
