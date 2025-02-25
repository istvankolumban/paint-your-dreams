import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { BookDetailsModel } from '../book-details/book/book.types';
import { BookService } from '../../services/book.service';
import { Asset } from '../../services/asset-manager.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-book-detailes-edit',
  templateUrl: './book-detailes-edit.component.html',
  styleUrls: ['./book-detailes-edit.component.scss'],
})
export class BookDetailesEditComponent implements OnInit {
  @Input() book!: BookDetailsModel;
  @Output() bookSaved = new EventEmitter<void>();
  bookForm: FormGroup;
  isValid = true;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private authService: AuthService
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      attachments: this.fb.array([]),
      pages: this.fb.array([], [Validators.required, Validators.minLength(4)]),
      backgroundColor: [''],
      color: [''],
    });
  }

  get attachments(): FormArray {
    return this.bookForm.get('attachments') as FormArray;
  }

  get pages(): FormArray {
    return this.bookForm.get('pages') as FormArray;
  }

  setAttachments(attachments: Asset[]) {
    const attachmentsFormArray = this.bookForm.get('attachments') as FormArray;
    attachmentsFormArray.clear();
    attachments.forEach((attachment) => {
      attachmentsFormArray.push(
        this.fb.control(attachment, Validators.required)
      );
    });
  }

  setPages(pages: Asset[]) {
    const pagesFormArray = this.bookForm.get('pages') as FormArray;
    pagesFormArray.clear();
    pages.forEach((page) => {
      pagesFormArray.push(this.fb.control(page, Validators.required));
    });
  }

  addAttachment(attachment: Asset) {
    this.attachments.push(this.fb.control(attachment, Validators.required));
  }

  removeAttachment(index: number) {
    this.attachments.removeAt(index);
  }

  addPage(page: Asset) {
    this.pages.push(this.fb.control(page, Validators.required));
  }

  removePage(index: number) {
    this.pages.removeAt(index);
  }

  ngOnInit() {
    if (this.book) {
      this.bookForm.patchValue({
        title: this.book.title,
        description: this.book.description,
        backgroundColor: this.book.backgroundColor || '',
        color: this.book.color || '',
      });
      this.setAttachments(this.book.attachments || []);
      this.setPages(this.book.pages || []);
    }
  }

  onAttachmentSelected(asset: Asset): void {
    this.addAttachment(asset);
  }

  onPageSelected(asset: Asset): void {
    this.addPage(asset);
  }

  saveBook() {
    if (this.bookForm.valid && this.authService.isAuthenticated()) {
      const bookData: Omit<BookDetailsModel, 'id'> = {
        title: this.bookForm.value.title,
        description: this.bookForm.value.description,
        attachments: this.bookForm.value.attachments,
        pages: this.bookForm.value.pages,
        backgroundColor: this.bookForm.value.backgroundColor,
        color: this.bookForm.value.color,
        order: this.book.order,
      };

      if (this.book.id) {
        this.bookService
          .updateBook(this.book.id, {
            ...bookData,
            id: this.book.id,
          })
          .subscribe({
            next: () => {
              console.log('Book updated successfully');
              this.bookSaved.emit();
            },
            error: (err) => console.error('Error updating book:', err),
          });
      } else {
        this.bookService.createBook(bookData).subscribe({
          next: (docRef) => {
            console.log('Book created successfully with ID:', docRef.id);
            this.bookSaved.emit();
          },
          error: (err) => console.error('Error creating book:', err),
        });
      }
    } else {
      this.isValid = false;
    }
  }
}
