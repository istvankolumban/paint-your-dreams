import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, updateDoc, doc, writeBatch } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { OurService } from './our-services.component';

@Injectable({ providedIn: 'root' })
export class OurServicesService {
  private readonly COLLECTION_NAME = 'our-services';

  constructor(private firestore: Firestore) {}

  fetchServices(): Observable<OurService[]> {
    const itemCollection = collection(this.firestore, this.COLLECTION_NAME);
    return from(getDocs(itemCollection)).pipe(
      map((querySnapshot) =>
        querySnapshot.docs.map((doc) => {
          const data = doc.data() as OurService;
          data.id = doc.id;
          return data;
        }).sort((a, b) => a.order - b.order)
      )
    );
  }

  addService(service: OurService): Observable<void> {
    const itemCollection = collection(this.firestore, this.COLLECTION_NAME);
    return from(addDoc(itemCollection, service)).pipe(map(() => void 0));
  }

  updateService(service: OurService): Observable<void> {
    const serviceDoc = doc(this.firestore, `${this.COLLECTION_NAME}/${service.id}`);
    return from(updateDoc(serviceDoc, { ...service })).pipe(map(() => void 0));
  }

  updateServices(services: OurService[]): Observable<void> {
    console.log(services);
    const batch = writeBatch(this.firestore);
    services.forEach((service) => {
      const serviceDoc = doc(this.firestore, `${this.COLLECTION_NAME}/${service.id}`);
      batch.update(serviceDoc, { ...service });
    });
    return from(batch.commit()).pipe(map(() => void 0));
  }
}
