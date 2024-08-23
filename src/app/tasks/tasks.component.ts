import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { ModalTaskComponent } from '../modal-task/modal-task.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { TaskService } from '../services/tasks.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-tasks',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, ModalTaskComponent,MatDatepickerModule,MatFormFieldModule,MatInputModule,MatCardModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{
  
  selected: Date | null = null;
  tasksPendiente: Task[] = [];
  tasksCompletada: Task[]=[];
  task_id: number | null = null;
  

  constructor(
    private taskService: TaskService,
    
  ){}

  ngOnInit() {
    this.getTask();
  }

  getTask(){
    this.taskService.getTasks().subscribe({
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

  onSwitchChange(event: Event, task: Task): void {
    
    task.status = !task.status;
    this.taskService.putTasks(task.id,task).subscribe({
      next:() => {
        this.tasksCompletada=[];
        this.tasksPendiente=[];
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
 

}
