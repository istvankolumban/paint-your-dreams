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

  ngOnInit(): void {
    this.loadAssets();
  }

  async loadAssets(): Promise<void> {
    this.rootFolder = await this.assetManagerService.fetchAssets();
    this.rootFolder.expanded = true;
  }

  selectImage(asset: Asset): void {
    this.selectedAsset = asset;
  }

  isPdf(fileName: string): boolean {
    return fileName.toLowerCase().endsWith('.pdf');
  }

  safeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  async createFolder(parentFolder: Folder): Promise<void> {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      await this.assetManagerService.createFolder(parentFolder, folderName);
      this.loadAssets();
    }
  }

  setCurrentFolder(folder: Folder): void {
    this.currentFolder = folder;
  }

  async onFilesSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && this.currentFolder) {
      await this.assetManagerService.uploadAssets(this.currentFolder, input.files);
      this.loadAssets();
    }
  }
}
