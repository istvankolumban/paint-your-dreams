import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  Query,
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

    collectionData<ProjectModel>(itemCollection as Query<ProjectModel>)
      .pipe(
        switchMap((projects) => {
          if (!projects.length) return of([]); // Handle empty collection case

          const projectsWithFetchedImages = projects.map((project) =>
            forkJoin({
              images: project.images
                ? forkJoin(
                    project.images.map((image) => this.getImageUrl(image))
                  )
                : of([]),
              coverImage: project.coverImage
                ? this.getImageUrl(project.coverImage)
                : of(''),
            }).pipe(
              map(({ images, coverImage }) => ({
                ...project,
                images,
                coverImage,
              }))
            )
          );

          return forkJoin(projectsWithFetchedImages);
        })
      )
      .subscribe((projects) => {
        console.log(projects);
        return this.projectsSubject.next(projects);
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
}
