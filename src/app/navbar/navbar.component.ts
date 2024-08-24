import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListService } from '../services/list.service';
import { CommonModule } from '@angular/common';
import { List } from '../models/list';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, ReactiveFormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  @Input() props!:{
    list_id: number | null
  }

  select_list_id: number | null = null;
  is_button_disable: boolean = false;
  lists: List[] = [];
  list_id: number | null = null;

  list_form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  list_obj: List = new List();

  constructor(
    private listService: ListService,
    private sharedService: SharedService,
  ){}
 

  ngOnInit() {
    this.getList();
    
  }

  getList(){
    this.listService.getLists().subscribe({
      next: (res) => {
        this.select_list_id = res[0].id;
        this.sharedService.set_select_list_id(this.select_list_id);
        res.map((r)=>{
          if(r.is_active){
            this.lists.push(r);
          }
        })
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  is_active(select_list_id: number):boolean {
    this.set_list_id(select_list_id);
    return this.select_list_id === select_list_id;
  }

  set_list_id(id:number){
    this.list_id = id;
  }

  new_list(){
    this.lists.push(this.list_obj);
    this.is_button_disable = true;
  }

  save_list(name: string){
    this.list_obj.name = name;
    this.listService.postLists(this.list_obj).subscribe({
      next: (res) =>{
        this.is_button_disable = false;
        const list_update = this.lists.find(list=>list.id === 0);
        if(list_update){
          list_update.name = res.name;
          list_update.id = res.id;
          list_update.is_active = res.is_active;
          this.list_obj = new List();
        }
        
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  delete_list(){
    this.listService.deleteList(Number(this.list_id)).subscribe({
      next: () =>{
        window.location.reload();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  update_class(id: number){
    this.select_list_id = id;
    this.sharedService.set_select_list_id(this.select_list_id);
  }

  update_list(target:EventTarget | null, id: number){
    const input = target as HTMLInputElement;
    if (id==0) {
      this.save_list(input.value);
    } else {
      this.listService.putLists(id,JSON.stringify({'name':input.value})).subscribe({
        next: (res) =>{
          console.log(res);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
    
  }

  all_tasks_lists(){
    this.select_list_id = 0;
    this.sharedService.set_select_list_id(this.select_list_id);
  }

  
}
