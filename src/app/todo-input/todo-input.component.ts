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
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.editTodoObs.subscribe(todo => {
        if(todo.id) {
          this.newTodo = {...todo};
        }
    });
  }

  addTodo() {
    this.todoService.addTodo(this.newTodo);
    this.newTodo = {id: null, title: '', complete: false};
  }

}
