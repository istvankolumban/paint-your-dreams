import { inject, Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  updateDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDocs,
  addDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import {
  BehaviorSubject,
  filter,
  from,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import {
  Asset,
  AssetManagerService,
} from '../../services/asset-manager.service';

export interface ProjectModel {
  id: string;
  expanded: boolean;
  coverImage: Asset;
  title: string;
  year: number;
  month: string;
  location: string;
  participants: string;
  organizers: Array<string>;
  description: string;
  images: Array<Asset>;
  order: number;
  visible: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class OurProjectsService {
  firestore = inject(Firestore);
  private readonly COLLECTION_NAME = 'our-projects';

  private projectsSubject = new BehaviorSubject<ProjectModel[] | null>(null);
  projects$ = this.projectsSubject.asObservable();
  private projectsCount = 0;

  constructor(private assetManagerService: AssetManagerService) {}

  fetchProjects(): void {
    if (this.projectsSubject.value) return; // Prevent duplicate API calls

    this.fetchProjectsObservable().subscribe();
  }

  getProjects(): Observable<ProjectModel[]> {
    if (!this.projectsSubject.value) {
      this.fetchProjects();
    }
    return this.projects$.pipe(
      filter((project): project is ProjectModel[] => project !== null)
    );
  }

  updateProject(projectId: string, project: ProjectModel): Observable<void> {
    const projectDocRef = doc(
      this.firestore,
      `${this.COLLECTION_NAME}/${projectId}`
    );
    return from(updateDoc(projectDocRef, { ...project })).pipe(
      switchMap(() => this.fetchProjectsObservable())
    );
  }

  createProject(
    project: Omit<ProjectModel, 'id'>
  ): Observable<DocumentReference<DocumentData>> {
    project = { ...project, order: this.projectsCount };
    const itemCollection = collection(this.firestore, this.COLLECTION_NAME);
    return from(addDoc(itemCollection, { ...project })).pipe(
      switchMap((docRef) =>
        this.fetchProjectsObservable().pipe(map(() => docRef))
      )
    );
  }

  createDefaultProject(): ProjectModel {
    return {
      id: '',
      expanded: false,
      coverImage: this.assetManagerService.createDefaultAsset(),
      title: '',
      year: new Date().getFullYear(),
      month: '',
      location: '',
      participants: '',
      organizers: [],
      description: '',
      images: [],
      order: -1,
      visible: false,
    };
  }

  deleteProject(projectId: string): Observable<void> {
    const projectDocRef = doc(
      this.firestore,
      `${this.COLLECTION_NAME}/${projectId}`
    );
    return from(deleteDoc(projectDocRef)).pipe(
      switchMap(() => this.fetchProjectsObservable())
    );
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

        return of(projects).pipe(
          map((projects) => {
            // Update projects count
            this.projectsCount = projects.length;
            // Order projects by project.order
            projects.sort((a, b) => a.order - b.order);
            this.projectsSubject.next(projects);
          })
        );
      })
    );
  }
}
