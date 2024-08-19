import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ListService {
  private initialLists: string[] = ['Lista 1', 'Lista 2']; // dummys

  getLists(): Observable<string[]> {
    return of(this.initialLists);
  }

  updateListName(index: number, newName: string): Observable<string[]> {
    this.initialLists[index] = newName;
    return of(this.initialLists);
  }
}
