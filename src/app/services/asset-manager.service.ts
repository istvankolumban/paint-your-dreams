import { inject, Injectable } from '@angular/core';
import {
  getDownloadURL,
  listAll,
  ref,
  Storage,
  uploadBytes,
  uploadString,
  deleteObject,
} from '@angular/fire/storage';

export interface Asset {
  name: string;
  url: string;
}

export interface Folder {
  name: string;
  assets: Asset[];
  folders: Folder[];
  expanded?: boolean;
  path: string;
}

@Injectable({ providedIn: 'root' })
export class AssetManagerService {
  storage = inject(Storage);

  constructor() {}

  async fetchAssets(): Promise<Folder> {
    const storageRef = ref(this.storage, '');
    const assetsList = await listAll(storageRef);
    const rootFolder = await this.processFolder(assetsList, '', '');

    return rootFolder;
  }

  private async processFolder(
    assetsList: any,
    folderName: string,
    parentPath: string
  ): Promise<Folder> {
    const folderPromises = assetsList.prefixes.map((folderRef: any) =>
      this.fetchFolder(folderRef, `${parentPath}${folderName}/`)
    );
    const assetPromises = assetsList.items.map((item: any) =>
      this.fetchAsset(item)
    );

    const folders = await Promise.all(folderPromises);
    const assets = await Promise.all(assetPromises);

    return {
      name: folderName,
      assets: assets,
      folders: folders,
      expanded: false,
      path: `${parentPath}${folderName}`,
    };
  }

  private async fetchFolder(folderRef: any, parentPath: string): Promise<Folder> {
    const assetsList = await listAll(folderRef);
    return this.processFolder(assetsList, folderRef.name, parentPath);
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

  async createFolder(parentFolder: Folder, folderName: string): Promise<void> {
    const folderPath = `${parentFolder.path}/${folderName}/.placeholder`;
    const folderRef = ref(this.storage, folderPath);
    await uploadString(folderRef, '', 'raw');
  }

  async uploadAssets(parentFolder: Folder, files: FileList): Promise<void> {
    const uploadPromises = Array.from(files).map((file) => {
      const assetPath = `${parentFolder.path}/${file.name}`;
      const assetRef = ref(this.storage, assetPath);
      return uploadBytes(assetRef, file);
    });
    await Promise.all(uploadPromises);
  }

  async deleteAsset(asset: Asset): Promise<void> {
    const assetRef = ref(this.storage, asset.url);
    await deleteObject(assetRef);
  }

  async deleteFolder(folder: Folder): Promise<void> {
    const folderRef = ref(this.storage, folder.path);
    const assetsList = await listAll(folderRef);

    const deletePromises = [
      ...assetsList.items.map((item) => deleteObject(item)),
      ...assetsList.prefixes.map((prefix) => this.deleteFolder({ ...folder, path: prefix.fullPath })),
    ];

    await Promise.all(deletePromises);
  }
}
