import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { ModalTaskComponent } from '../modal-task/modal-task.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-tasks',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, ModalTaskComponent,MatDatepickerModule,MatFormFieldModule,MatInputModule,MatCardModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  labels1: string[] = [];
  labels2: string[] = [];
  selected: Date | null = null;

  onSwitchChange(event: Event, label: string): void {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;

    if (isChecked) {
      // Mover el label a la parte inferior
      this.moveLabelToLowerSection(label, 'labels1');
    } else {
      // Mover el label a la parte superior
      this.moveLabelToUpperSection(label, 'labels2');
    }
  }

  moveLabelToLowerSection(label: string, sourceList: 'labels1' | 'labels2'): void {
    const index = this[sourceList].indexOf(label);
    if (index !== -1) {
      this[sourceList].splice(index, 1);
      this.labels2.push(label);
    }
  }

  moveLabelToUpperSection(label: string, sourceList: 'labels1' | 'labels2'): void {
    const index = this[sourceList].indexOf(label);
    if (index !== -1) {
      this[sourceList].splice(index, 1);
      this.labels1.push(label);
    }
  }

  addLabel(section: 'labels1' | 'labels2') {
    const newLabel = prompt('Ingrese el nombre de la nueva tarea:');
    if (newLabel) {
      this[section].push(newLabel);
    }
  }

  editLabel(section: 'labels1' | 'labels2', index: number) {
    const updatedLabel = prompt('Modificar tarea:', this[section][index]);
    if (updatedLabel) {
      this[section][index] = updatedLabel;
    }
  }

  deleteLabel(section: 'labels1' | 'labels2', index: number) {
    this[section].splice(index, 1);
  }
}
