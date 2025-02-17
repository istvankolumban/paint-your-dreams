import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  Query,
  updateDoc,
  doc,
  DocumentData,
  DocumentReference,
  query,
  where,
  getDocs,
  addDoc,
} from '@angular/fire/firestore';
import {
  BehaviorSubject,
  filter,
  forkJoin,
  from,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';

export interface ProjectModel {
  id: string;
  expanded: boolean;
  coverImage: string;
  title: string;
  year: number;
  month: string;
  location: string;
  participants: string;
  organizers: Array<string>;
  description: string;
  images: Array<string>;
}

@Injectable({
  providedIn: 'root',
})
export class OurProjectsService {
  storage = inject(Storage);
  firestore = inject(Firestore);
  private readonly COLLECTION_NAME = 'our-projects';

  private projectsSubject = new BehaviorSubject<ProjectModel[] | null>(null);
  projects$ = this.projectsSubject.asObservable();

  fetchProjects(): void {
    if (this.projectsSubject.value) return; // Prevent duplicate API calls

    const itemCollection = collection(this.firestore, this.COLLECTION_NAME);

    getDocs(itemCollection).then((querySnapshot) => {
      const projects: ProjectModel[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<ProjectModel, 'id'>;
        projects.push({ id: doc.id, ...data });
      });

      const projectsWithFetchedImages = projects.map((project) =>
        forkJoin({
          images: project.images && project.images.length > 0
            ? forkJoin(project.images.map((image) => this.getImageUrl(image)))
            : of([]), // Handle empty images list case
          coverImage: project.coverImage
            ? this.getImageUrl(project.coverImage)
            : of(''), // Handle empty coverImage case
        }).pipe(
          map(({ images, coverImage }) => ({
            ...project,
            images,
            coverImage,
          }))
        )
      );

      forkJoin(projectsWithFetchedImages).subscribe((projects) => {
        console.log(projects);
        this.projectsSubject.next(projects);
      });
    });
  }

  getProjects(): Observable<ProjectModel[]> {
    if (!this.projectsSubject.value) {
      this.fetchProjects();
    }
    return this.projects$.pipe(
      filter((project): project is ProjectModel[] => project !== null)
    );
  }

  private getImageUrl(url: string): Observable<string> {
    const pathReference = ref(this.storage, url);
    return from(getDownloadURL(pathReference));
  }

  updateProject(projectId: string, project: ProjectModel): Observable<void> {
    const projectDocRef = doc(this.firestore, `${this.COLLECTION_NAME}/${projectId}`);
    return from(updateDoc(projectDocRef, { ...project })).pipe(
      switchMap(() => this.fetchProjectsObservable())
    );
  }

  createProject(project: Omit<ProjectModel, 'id'>): Observable<DocumentReference<DocumentData>> {
    const itemCollection = collection(this.firestore, this.COLLECTION_NAME);
    return from(addDoc(itemCollection, { ...project })).pipe(
      switchMap((docRef) => this.fetchProjectsObservable().pipe(map(() => docRef)))
    );
  }

  createDefaultProject(): ProjectModel {
    return {
      id: '',
      expanded: false,
      coverImage: '',
      title: '',
      year: new Date().getFullYear(),
      month: '',
      location: '',
      participants: '',
      organizers: [],
      description: '',
      images: [],
    };
  }

  private fetchProjectsObservable(): Observable<void> {
    const itemCollection = collection(this.firestore, this.COLLECTION_NAME);

    return from(getDocs(itemCollection)).pipe(
      switchMap((querySnapshot) => {
        const projects: ProjectModel[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Omit<ProjectModel, 'id'>;
          projects.push({ id: doc.id, ...data });
        });

        const projectsWithFetchedImages = projects.map((project) =>
          forkJoin({
            images: project.images && project.images.length > 0
              ? forkJoin(project.images.map((image) => this.getImageUrl(image)))
              : of([]), // Handle empty images list case
            coverImage: project.coverImage
              ? this.getImageUrl(project.coverImage)
              : of(''), // Handle empty coverImage case
          }).pipe(
            map(({ images, coverImage }) => ({
              ...project,
              images,
              coverImage,
            }))
          )
        );

        return forkJoin(projectsWithFetchedImages).pipe(
          map((projects) => {
            console.log(projects);
            this.projectsSubject.next(projects);
          })
        );
      })
    );
  }
}