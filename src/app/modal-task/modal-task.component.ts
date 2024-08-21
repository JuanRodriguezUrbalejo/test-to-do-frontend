import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-modal-task',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule,MatDatepickerModule,MatFormFieldModule,MatInputModule],
  templateUrl: './modal-task.component.html',
  styleUrl: './modal-task.component.css'
})
export class ModalTaskComponent {
 



}
