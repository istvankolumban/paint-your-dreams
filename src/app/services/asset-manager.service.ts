import { inject, Injectable } from '@angular/core';
import { getDownloadURL, listAll, ref, Storage } from '@angular/fire/storage';

export interface Asset {
  name: string;
  url: string;
}

export interface Folder {
  name: string;
  assets: Asset[];
  folders: Folder[];
  expanded?: boolean; // Add this property
}

@Injectable({ providedIn: 'root' })
export class AssetManagerService {
  storage = inject(Storage);

  constructor() {}

  async fetchAssets(): Promise<Folder> {
    const storageRef = ref(this.storage, '');
    const assetsList = await listAll(storageRef);
    const rootFolder = await this.processFolder(assetsList, '');

    return rootFolder;
  }

  private async processFolder(
    assetsList: any,
    folderName: string
  ): Promise<Folder> {
    const folderObservables = assetsList.prefixes.map((folderRef: any) =>
      this.fetchFolder(folderRef)
    );
    const assetObservables = assetsList.items.map((item: any) =>
      this.fetchAsset(item)
    );

    const folders = await Promise.all(folderObservables);
    const assets = await Promise.all(assetObservables);

    return {
      name: folderName,
      assets: assets,
      folders: folders,
      expanded: false,
    };
  }

  private async fetchFolder(folderRef: any): Promise<Folder> {
    const assetsList = await listAll(folderRef);
    return this.processFolder(assetsList, folderRef.name);
  }

  private async fetchAsset(item: any): Promise<Asset> {
    try {
      const url = await getDownloadURL(item);
      return { name: item.name, url: url };
    } catch (error) {
      console.error(`Failed to get download URL for ${item.name}:`, error);
      return { name: item.name, url: '' };
    }
  }
}
