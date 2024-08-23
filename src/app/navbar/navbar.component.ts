import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ListService } from '../services/listprueba.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, ReactiveFormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  form: FormGroup;
  maxButtons = 10; 

  constructor(private fb: FormBuilder, private listService: ListService) {
    this.form = this.fb.group({
      lists: this.fb.array([]) // Aquí se manejan las listas
    });
  }

  ngOnInit() {
    // Se obtienen las listas del back
    this.listService.getLists().subscribe(data => {
      this.initializeForm(data);
    });
  }

  get lists(): FormArray {
    return this.form.get('lists') as FormArray;
  }

  initializeForm(lists: string[]) {
    lists.forEach(list => this.lists.push(this.fb.control(list)));
  }

  addButton() {
    if (this.lists.length < this.maxButtons) {
      const newListName = `Lista ${this.lists.length + 1}`;
      this.lists.push(this.fb.control(newListName));
    } else {
      alert('No puedes agregar más de 10 listas.');
    }
  }

  updateListName(index: number) {
    const newName = this.lists.at(index).value;
    this.listService.updateListName(index, newName).subscribe();
    console.log(newName);
  }

  delete(){
    //TODO: falta realizar la codificación para eliminar las listas
  }
}
