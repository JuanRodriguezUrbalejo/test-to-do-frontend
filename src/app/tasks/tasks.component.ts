import { CommonModule, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { ModalTaskComponent } from '../modal-task/modal-task.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { TaskService } from '../services/tasks.service';
import { Task } from '../models/task';
import { SharedService } from '../services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, ModalTaskComponent,MatDatepickerModule,MatFormFieldModule,MatInputModule,MatCardModule, NgIf],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit, OnDestroy{
  
  selected: Date | null = null;
  tasksPendiente: Task[] = [];
  tasksCompletada: Task[]=[];
  task_id: number | null = null;
  select_list_id: number | null = null;
  private subscription: Subscription | null = null;

  pendienteTask: boolean = true;
  completadaTask: boolean = true;
  is_button_disable_pendiente: boolean = false;
  is_button_disable_completada: boolean = false;
  is_button_disable_add: boolean = true;

  constructor(
    private taskService: TaskService,
    private sharedService: SharedService,
  ){}

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription?.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscription = this.sharedService.select_list_id$.subscribe(id =>{
      if(id !== null){
        this.select_list_id = id;
        this.getTask();
      }
    });
  }

  

  getTask(){
    console.log(this.select_list_id);
    this.tasksCompletada=[];
    this.tasksPendiente=[];
    if(this.select_list_id == 0){
      this.is_button_disable_add = false;
      console.log(this.is_button_disable_add);
      this.taskService.getTasks().subscribe({
        next: (res) => {
          res.map((r)=>{
            if(r.is_active){
              if (r.status) {
                this.tasksCompletada.push(r);
              } else {
                this.tasksPendiente.push(r);
              }
            }
          })
        },
        error: (error) => {
          console.error(error);
        }
      })
    }else {
      this.is_button_disable_add = true;
      this.taskService.getTasksList(Number(this.select_list_id)).subscribe({
        next: (res) => {
          res.map((r)=>{
            if (r.status) {
              this.tasksCompletada.push(r);
            } else {
              this.tasksPendiente.push(r);
            }
            
          })
        },
        error: (error) => {
          console.error(error);
        }
      })
    }
  }

  onSwitchChange(event: Event, task: Task): void {
    task.status = !task.status;
    this.taskService.putTasks(task.id,task).subscribe({
      next:() => {
        this.getTask();
      },
      error: (error) => {
        console.error(error);
      }
    })
    
  }

  set_tasks_component_id(id:number){
    this.task_id = id;
  }

  delete_tasks_component(){
    this.taskService.deleteTask(Number(this.task_id)).subscribe(
      () =>{
        window.location.reload();
      }
    )
  }

  all_task(){
    this.pendienteTask = true;
    this.completadaTask = true;
    this.is_button_disable_completada = false;
    this.is_button_disable_pendiente = false;
  }

  completada_task(){
    this.is_button_disable_completada = true;
    this.is_button_disable_pendiente = false;
    if(this.completadaTask){
      this.pendienteTask = !this.pendienteTask;
    }else{
      this.completadaTask = !this.completadaTask;
      this.completada_task();
    }
  }

  pendiente_task(){
    this.is_button_disable_pendiente = true;
    this.is_button_disable_completada = false;
    if(this.pendienteTask){
      this.completadaTask = !this.completadaTask;
    }else{
      this.pendienteTask = !this.pendienteTask;
      this.pendiente_task();
    }
  }
 

}
