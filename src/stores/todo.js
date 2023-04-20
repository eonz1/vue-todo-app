import { defineStore } from 'pinia';
import dayjs from 'dayjs';
import { useLocalStorage } from '@vueuse/core';
import { ref, computed } from 'vue';

export const useTodoStore = defineStore('todoStore', () => {
  const localStorageTodo = useLocalStorage('todos', []);

  const todos = ref(localStorageTodo.value);
  const searchWord = ref('');

  const filteredTodos = computed(() => {
    return searchWord.value.length > 0
      ? todos.value.filter((todo) => todo.text.includes(searchWord.value))
      : todos.value;
  });

  const todo = (todoId) => {
    return todos.value.find((todo) => todo.id === todoId);
  };

  function addTodo(todo) {
    todo.date = dayjs(todo.date).format('YYYY-MM-DD');
    todos.value.push(todo);

    localStorageTodo.value = todos.value;
  }

  function removeTodo(todoId) {
    todos.value = todos.value.filter((todo) => todo.id !== todoId);

    localStorageTodo.value = todos.value;
  }

  function toggleCheck(todoId) {
    todo(todoId).isDone = !todo(todoId).isDone;

    localStorageTodo.value = todos.value;
  }

  function editDate(todoId, date) {
    todo(todoId).date = dayjs(date).format('YYYY-MM-DD');

    localStorageTodo.value = todos.value;
  }

  function editText(todoId, text) {
    todo(todoId).text = text;

    localStorageTodo.value = todos.value;
  }

  function editColor(todoId, color) {
    todo(todoId).background = color;

    localStorageTodo.value = todos.value;
  }

  function moveTodo(todoId, moveValue) {
    const index = todos.value.findIndex((todo) => todo.id === todoId);

    let newPosition = index + moveValue;

    const movedTodos = JSON.parse(JSON.stringify(todos.value));
    if (index === 0 || newPosition >= todos.value.length) newPosition = todos.value.length;

    movedTodos.splice(index, 1);
    movedTodos.splice(newPosition, 0, todo(todoId));

    todos.value = movedTodos;
    localStorageTodo.value = todos.value;
  }

  function resetSearchWord() {
    this.searchWord = '';
  }

  return {
    todos,
    searchWord,
    filteredTodos,
    addTodo,
    removeTodo,
    toggleCheck,
    editDate,
    editText,
    editColor,
    moveTodo,
    resetSearchWord
  };
});
