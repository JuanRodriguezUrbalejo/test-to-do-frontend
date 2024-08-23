import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../..//environments/environment"
import { List } from "../models/list";

@Injectable({
    providedIn: 'root'
})
export class ListService{
    constructor(private http:HttpClient){}
    private apiUrl: string = `${environment.apiUrl}/to_do/lista/`
    httpOptions = {
        headers: new HttpHeaders({'Content-Type':'application/json'})
    }
    
    getLists(): Observable<List[]>{
        return this.http.get<List[]>(`${this.apiUrl}lista/`, this.httpOptions);
    }

    postLists(list: List): Observable<List>{
        return this.http.post<List>(`${this.apiUrl}crear/`, list, this.httpOptions);
    }

    getList(pk: number): Observable<List>{
        return this.http.get<List>(`${this.apiUrl}${pk}/`);
    }

    putLists(pk: number, list: string): Observable<string>{
        return this.http.put<string>(`${this.apiUrl}${pk}/`, list, this.httpOptions);
    }

    deleteList(pk: number): Observable<List>{
        return this.http.delete<List>(`${this.apiUrl}${pk}/`);
    }


}