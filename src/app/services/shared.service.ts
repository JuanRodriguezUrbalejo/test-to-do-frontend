import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private select_list_id_source = new BehaviorSubject<number | null>(null);
  select_list_id$ = this.select_list_id_source.asObservable();

  set_select_list_id(id: number): void {
    this.select_list_id_source.next(id);
  }

  get_select_list_id(): number | null {
    return this.select_list_id_source.getValue();
  }
}