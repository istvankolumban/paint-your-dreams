import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CarouselItemModel } from '../../pages/home-page/home.service';
import { Asset } from '../../services/asset-manager.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  standalone: false,
})
export class CarouselComponent implements OnInit {
  @Input() carouselItems: CarouselItemModel[] = [];
  @Input() isEditing = false;
  @Output() carouselItemsSaved = new EventEmitter<CarouselItemModel[]>();

  carouselForm: FormGroup;
  selectedImageIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.carouselForm = this.fb.group({
      items: this.fb.array([]),
    });
  }

  get items(): FormArray {
    return this.carouselForm.get('items') as FormArray;
  }

  ngOnInit(): void {
    if (this.isEditing) {
      this.setCarouselItems(this.carouselItems);
    }
  }

  ngOnChanges(): void {
    if (this.isEditing) {
      this.setCarouselItems(this.carouselItems);
    }
  }

  setCarouselItems(items: CarouselItemModel[]): void {
    const itemsFormArray = this.carouselForm.get('items') as FormArray;
    itemsFormArray.clear();
    items.forEach((item) => {
      itemsFormArray.push(this.createCarouselItemFormGroup(item));
    });
  }

  createCarouselItemFormGroup(item: CarouselItemModel): FormGroup {
    return this.fb.group({
      id: [item.id],
      image: [item.image, Validators.required],
      text: [item.text],
      order: [item.order],
      visible: [item.visible],
    });
  }

  addCarouselItem(): void {
    const newItem: CarouselItemModel = {
      id: '',
      image: { name: '', url: '' },
      text: '',
      order: this.items.length,
      visible: true,
    };
    this.items.push(this.createCarouselItemFormGroup(newItem));
  }

  removeCarouselItem(index: number): void {
    this.items.removeAt(index);
  }

  saveCarouselItems(): void {
    if (this.carouselForm.valid) {
      this.carouselItemsSaved.emit(
        this.carouselForm.value.items as CarouselItemModel[]
      );
    }
  }

  onImageSelected(asset: Asset, index: number): void {
    const items = this.carouselForm.get('items') as FormArray;
    const item = items.at(index) as FormGroup;
    item.patchValue({ image: asset });
  }
}
