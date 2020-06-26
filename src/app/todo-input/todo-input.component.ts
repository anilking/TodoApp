import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {

  newTodo: Todo = {id: null, title: '', complete: false};
  isDuplicate: boolean = false;
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.editTodoObs.subscribe(todo => {
        if(todo.id) {
          this.newTodo = {...todo};
        }
    });
  }

  addTodo() {
    this.isDuplicate = false;
    if(this.newTodo.id || !this.checkDuplicateTodo()) {
      this.todoService.addTodo(this.newTodo);
      this.newTodo = {id: null, title: '', complete: false};
    }
  }
  checkDuplicateTodo(): boolean {
    let todos = JSON.parse(localStorage.getItem( 'todos')) || [];
    let index = todos.findIndex(t => t.title.toLowerCase() === this.newTodo.title.toLowerCase());
    if(index === -1) {
      return false
    }
    this.isDuplicate = true;
    return true;
  }
}
