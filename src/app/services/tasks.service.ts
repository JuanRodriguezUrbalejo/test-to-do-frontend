import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../..//environments/environment"
import { Task } from "../models/task";

@Injectable({
    providedIn: 'root'
})
export class TaskService{
    constructor(private http:HttpClient){}
    private apiUrl: string = `${environment.apiUrl}/to_do/tarea/`
    httpOptions = {
        headers: new HttpHeaders({'Content-Type':'application/json'})
    }
    
    getTasks(): Observable<Task[]>{
        return this.http.get<Task[]>(`${this.apiUrl}lista/`,this.httpOptions);
    }

    postTasks(task: Task): Observable<Task>{
        return this.http.post<Task>(`${this.apiUrl}crear/`, task, this.httpOptions);
    }

    getTask(pk: number): Observable<Task>{
        return this.http.get<Task>(`${this.apiUrl}${pk}/`);
    }

    putTasks(pk: number, task: Task): Observable<Task>{
        return this.http.put<Task>(`${this.apiUrl}${pk}/`, task, this.httpOptions);
    }

    deleteTask(pk: number): Observable<Task>{
        return this.http.delete<Task>(`${this.apiUrl}${pk}/`);
    }

    getTasksList(pk: number): Observable<Task[]>{
        return this.http.get<Task[]>(`${this.apiUrl}lista/${pk}/`,this.httpOptions);
    }


}