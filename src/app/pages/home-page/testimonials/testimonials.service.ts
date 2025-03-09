import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  writeBatch,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Testimonial {
  title: string;
  content: string;
  author: string;
  link: string;
  image: string;
  expanded: boolean;
  id: string;
  visible: boolean;
  order: number;
  isEditing?: boolean;
}

@Injectable({ providedIn: 'root' })
export class TestimonialsService {
  private readonly COLLECTION_NAME = 'testimonials';

  constructor(private firestore: Firestore) {}

  fetchTestimonials(): Observable<Testimonial[]> {
    const itemCollection = collection(this.firestore, this.COLLECTION_NAME);
    return from(getDocs(itemCollection)).pipe(
      map((querySnapshot) =>
        querySnapshot.docs
          .map((doc) => {
            const data = doc.data() as Testimonial;
            data.id = doc.id;
            return data;
          })
          .sort((a, b) => a.order - b.order)
      )
    );
  }

  addTestimonial(testimonial: Testimonial): Observable<string> {
    const itemCollection = collection(this.firestore, this.COLLECTION_NAME);
    const { id, ...testimonialData } = testimonial; // Exclude the id attribute
    return from(addDoc(itemCollection, testimonialData)).pipe(
      map((docRef) => docRef.id)
    );
  }

  updateTestimonial(testimonial: Testimonial): Observable<void> {
    const testimonialDoc = doc(
      this.firestore,
      `${this.COLLECTION_NAME}/${testimonial.id}`
    );
    return from(updateDoc(testimonialDoc, { ...testimonial })).pipe(map(() => void 0));
  }

  updateTestimonials(testimonials: Testimonial[]): Observable<void> {
    const batch = writeBatch(this.firestore);
    testimonials.forEach((testimonial) => {
      const testimonialDoc = doc(
        this.firestore,
        `${this.COLLECTION_NAME}/${testimonial.id}`
      );
      batch.update(testimonialDoc, { ...testimonial });
    });
    return from(batch.commit()).pipe(map(() => void 0));
  }

  deleteTestimonial(testimonialId: string): Observable<void> {
    const testimonialDoc = doc(
      this.firestore,
      `${this.COLLECTION_NAME}/${testimonialId}`
    );
    return from(deleteDoc(testimonialDoc)).pipe(map(() => void 0));
  }
}
