import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotebookData } from '../notebook-data';
import { NotebooksService } from '../notebooks.service';
import { Location } from '@angular/common';
import { Notedata } from '../../notedata';
import { TodolistData } from '../todolist-data';

@Component({
  selector: 'app-notebook-details',
  templateUrl: './notebook-details.component.html',
  styleUrls: ['./notebook-details.component.css']
})
export class NotebookDetailsComponent implements OnInit {
  notebook:NotebookData;
  notebooks:NotebookData[];
  // notes : Notedata[] = [];
  // modalRef: BsModalRef;
  proverbRandomVal
  hoverIdx = -1;hoverTodoIdx=-1;
  show:boolean=false;clickIdx=-1;todoIdx=-1;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notebooksService: NotebooksService,
    private location: Location,
    // private modalService: BsModalService
    ) { }

  ngOnInit(): void {
    this.getNoteBook();
    // this.getAllNoteBooks();
    this.proverbRandomVal = this.proverb[Math.floor(Math.random() * this.proverb.length)];
  }

  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  // }

  notesView(notes):void{
    this.router.navigate(['note/'+notes.id,{'notebookId':this.notebook.id}], {relativeTo:this.route});
  }
  todoView(todo):void{
    this.router.navigate(['todo/'+todo.id,{'notebookId':this.notebook.id}], {relativeTo:this.route});
  }

getAllNoteBooks(): void{
  this.notebooksService.getAllNotebooks()
      .subscribe(notes => this.notebooks = notes);
}

getNoteBook(): void {
  console.log("This is get notebook")
  const id = +this.route.snapshot.paramMap.get('id');
  console.log("This is get notebook"+id);
  this.notebooksService.getNoteBook(id)
    .subscribe(
      notebook => this.notebook = notebook
    );
  console.log("notebookd = ")
} 

colorRandomVal;
colorVal;noteLen;words;

addNote(): void{
  this.colorRandomVal = Math.floor(Math.random() * this.colors.length); 
  this.noteLen = this.notebook.noteList.length+1;   
  
  this.notebooksService.updateNotebook(this.notebook)
    // .subscribe(() => this.getNoteBook());
    .subscribe({
      complete: () => {
        this.router.navigate(['note/'+this.noteLen,{'notebookId':this.notebook.id}], {relativeTo:this.route});
      },
      next:()=>note => this.notebook = note
   })
}
globalTodoLen=0;

addTodo(): void{
  this.colorRandomVal = Math.floor(Math.random() * this.colors.length); 
  this.noteLen = this.notebook.todoList.length;
  if(this.globalTodoLen<this.noteLen){
    this.globalTodoLen=this.noteLen;
    this.globalTodoLen++;    
  }   
  else{
    this.globalTodoLen++;
  }
  this.notebooksService.updateNotebook(this.notebook)
    .subscribe({
      complete: () => {
        this.router.navigate(['todo/'+this.globalTodoLen,{'notebookId':this.notebook.id}], {relativeTo:this.route});
      },
      next:()=>note => this.notebook = note
   })
}

updateName(): void{
  this.notebooksService.updateNotebook(this.notebook)
    .subscribe(() => this.goBack());
}
delNode;

deleteNote(noteId:number,notebook): void{
  console.log("note Id - "+noteId);
  const index = notebook.findIndex(e =>e.id===noteId);
  notebook.splice(index,1);    
  this.notebooksService.updateNotebook(this.notebook)
    .subscribe({complete: () => {
      this.router.navigate([], {relativeTo:this.route});
    }});
}
currentTodo;
deleteTodo(todoId:number,notebook): void{
  const index = notebook.findIndex(e =>e.id===todoId);
  console.log("note id to be deleted - "+todoId);
  this.currentTodo = this.notebook.todoList.splice(index,1);
  this.notebooksService.updateNotebook(this.notebook)
    .subscribe({complete: () => {
      this.router.navigate([], {relativeTo:this.route});
    }});
}
noteListLen;
copyToNB(notebook:NotebookData, note:Notedata): void{
  console.log("copyToNB = "+note.id);
   this.colorRandomVal = Math.floor(Math.random() * this.colors.length);
  this.noteListLen = notebook.noteList.length;
 
 this.notebooksService.updateNotebook(notebook)
    .subscribe(() => this.goBack());

}

goBack() : void {
  this.location.back()
}

save(): void {
  this.notebooksService.updateNotebook(this.notebook)
    .subscribe(() => this.goBack());
}
 
toggle(idx,type) {
  console.log("click id = "+this.clickIdx);
  if(type=="note"){
    if(this.clickIdx===idx)
    {
      this.clickIdx = -1;
      this.show = false;
    }
    else  
    {
      this.show = true;
      this.clickIdx = idx;
    }
  }
  if(type=="todo"){
    if(this.todoIdx===idx)
    {
      this.todoIdx = -1;
      this.show = false;
    }
    else  
    {
      this.show = true;
      this.todoIdx = idx;
    }
  }
  console.log("toggle = "+idx+" toggle type - "+type);
}

todoList;
 copyTodoToNB(notebook:NotebookData,todo:TodolistData): void{
  console.log("copyToNB = "+todo);
  this.colorRandomVal = Math.floor(Math.random() * this.colors.length);
  this.todoList = notebook.todoList.length;
 
  this.notebooksService.updateNotebook(notebook)
    .subscribe(() => this.goBack());
}


colors = [ 
      {value : '#CD5C5C'},
      {value : '#7DCEA0'},
      {value : '#FFA406'},
      {value : '#5D9EBC'},
      {value : '#7B5DB0'},
      {value : '#E82640'},
      {value : '#135845'},
      {value : '#c74d4d'},
      {value : '#b39363'},
      {value : '#848484'},
      {value : '#01559e'},
      {value : '#506271'},
      {value : '#18CFA0'}
    ];

proverb = [
  {
    value : 'It is never too late to be what you might have been.',
    author : 'Plato'
  },
  {value : 'From small beginnings come great things',
  author : 'Unknown'},
  {value : 'Somewhere, something incredible is waiting to be known.',
  author : 'Carl Sagan'},
]

}