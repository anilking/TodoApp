import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {

  todos: Todo[] = JSON.parse(localStorage.getItem( 'todos')) || [];
  lastId: number = JSON.parse(localStorage.getItem( 'lastId')) || 0;
  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.todoService.currentTodo.subscribe(todo => {
      if (todo.title.trim()) {
        if (!todo.id) {
          todo.id = ++this.lastId;
          this.todos.push(todo);
        } else {
          let updateTodo = this.todos
          .filter(t => t.id === todo.id)
          .pop() || {};
          Object.assign(updateTodo, todo);
        }
        localStorage.setItem('todos', JSON.stringify(this.todos)); 
      }
    });
    window.onbeforeunload = () => this.ngOnDestroy();
  }

  ngOnDestroy() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
    localStorage.setItem('lastId', JSON.stringify(this.lastId));
  }



  toggleTodoComplete(id) {
    let updatedTodo = this.todos
      .filter(todo => todo.id === id)
      .pop();
    updatedTodo.complete = !updatedTodo.complete;
  }

  removeTodo(id) {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
  }

  editTodo(todo) {
    todo.complete = false;
    this.todoService.editTodo(todo);
  }


}
