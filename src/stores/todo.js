import { defineStore } from 'pinia';
import dayjs from 'dayjs';
import { useLocalStorage } from '@vueuse/core';

export const useTodoStore = defineStore({
  id: 'todoStore',
  state: () => ({
    todos: useLocalStorage('todos', []),
    searchWord: ''
  }),
  getters: {
    getTodos() {
      return this.todos.filter((todo) => todo.text.includes(this.searchWord));
    }
  },
  actions: {
    addTodo(todo) {
      todo.date = dayjs(todo.date).format('YYYY-MM-DD');
      this.todos.push(todo);
    },
    removeTodo(todoId) {
      this.todos = this.todos.filter((t) => {
        return t.id !== todoId;
      });
    },
    toggleCheck(todoId) {
      const todo = this.todos.find((t) => t.id === todoId);
      todo.isDone = !todo.isDone;
    },
    editDate(todoId, date) {
      const todo = this.todos.find((t) => t.id === todoId);
      todo.date = dayjs(date).format('YYYY-MM-DD');
    },
    editText(todoId, text) {
      const todo = this.todos.find((t) => t.id === todoId);
      todo.text = text;
    },
    editColor(todoId, color) {
      const todo = this.todos.find((t) => t.id === todoId);
      todo.background = color;
    },
    moveTodo(todoId, moveValue) {
      const index = this.todos.findIndex((t) => t.id === todoId);
      const todo = this.todos.find((t) => t.id === todoId);

      let newPosition = index + moveValue;

      const movedTodos = this.todos;
      if (newPosition >= this.todos.length) newPosition = this.todos.length;

      movedTodos.splice(index, 1);
      movedTodos.splice(newPosition, 0, todo);

      this.todos = movedTodos;
    },
    resetSearchWord() {
      this.searchWord = '';
    }
  }
});
