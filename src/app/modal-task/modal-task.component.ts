import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../services/tasks.service';
import { Task } from '../models/task';
import {MatSelectModule} from '@angular/material/select';

interface Priority {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modal-task',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule,MatDatepickerModule,MatFormFieldModule,MatInputModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './modal-task.component.html',
  styleUrl: './modal-task.component.css'
})
export class ModalTaskComponent implements OnChanges{
  @Input() props!:{
    task_id: number | null
  }

  

  task_form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    start_date: new FormControl('', [Validators.required]),
  });

  prioritys: Priority[] = [
    {value: 'H', viewValue: 'Alta'},
    {value: 'M', viewValue: 'Media'},
    {value: 'L', viewValue: 'Baja'},
  ];

  constructor(private task: TaskService){}

  form_type: string = "Agregar tarea";
  task_obj: Task = new Task();

  

  ngOnChanges(): void {
    if (this.props.task_id == 0 || this.props.task_id == null) {
      this.form_type = "Agregar tarea";
      this.clear();
    } else {
      this.form_type = "Modificar tarea";
      this.task.getTask(Number(this.props.task_id)).subscribe({
        next: (res) => {
          this.task_obj = res;
          this.task_form.patchValue({
            name: this.task_obj.name,
            priority: this.task_obj.priority,
            start_date: this.task_obj.start_date,
          });
        },
        error: () => {
          window.location.reload();
        }
        
        }  
      );
    }
  }

  save_task(){
    this.task_obj.name = (this.task_form.get('name') as FormControl).value;
    this.task_obj.priority = (this.task_form.get('priority') as FormControl).value;
    this.task_obj.start_date = (this.task_form.get('start_date') as FormControl).value;
    this.task_obj.list = 1;
    
    if (this.form_type == 'Agregar tarea') {
        this.task.postTasks(this.task_obj).subscribe({
        next: () =>{
          window.location.reload();
        },
        error: (error) =>{
          console.log(error);
        }
      });
    } else if (this.form_type == 'Modificar tarea'){
      this.task.putTasks(Number(this.props.task_id),this.task_obj).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (error) =>{
          console.log(error);
        }
      });
    }
  }

  clear(){
    (this.task_form.get('name') as FormControl).setValue('');
    (this.task_form.get('priority') as FormControl).setValue('');
    (this.task_form.get('start_date') as FormControl).setValue('');
  }


}
