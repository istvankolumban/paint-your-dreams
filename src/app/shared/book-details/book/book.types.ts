import { Asset } from '../../../services/asset-manager.service';

export interface Cover {
  front: BookPageSide;
  back: BookPageSide;
}

export enum PageType {
  Single,
  Double,
}

export interface BookPageSide {
  imageUrl: string;
  backgroundColor?: string;
  opacity?: number;
}

export interface Book {
  width: number;
  height: number;
  zoom: number;
  cover?: Cover;
  pages: BookPageSide[];
  pageWidth?: number;
  pageHeight?: number;
  startPageType?: PageType;
  endPageType?: PageType;
}

export interface BookDetailsModel {
  id: string;
  title: string;
  description: string;
  color?: string;
  backgroundColor?: string;
  attachments: Array<Asset>;
  pages: Array<Asset>;
}

export interface Attachment {
  title: string;
  url: string;
}
