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
      ? todos.value.filter(({ text }) => [text].some((text) => text.includes(searchWord.value)))
      : todos.value;
  });

  function addTodo(todo) {
    todo.date = dayjs(todo.date).format('YYYY-MM-DD');
    todos.value.push(todo);

    localStorageTodo.value = JSON.parse(JSON.stringify(todos.value));
  }

  function removeTodo(todoId) {
    todos.value = todos.value.filter(({ id }) => [id].some((id) => id !== todoId));

    localStorageTodo.value = todos.value;
  }

  function toggleCheck(todoId) {
    const todo = todos.value.find(({ id }) => [id].some((id) => id === todoId));
    todo.isDone = !todo.isDone;
  }

  function editDate(todoId, date) {
    const todo = todos.value.find(({ id }) => [id].some((id) => id === todoId));
    todo.date = dayjs(date).format('YYYY-MM-DD');
  }

  function editText(todoId, text) {
    const todo = todos.value.find(({ id }) => [id].some((id) => id === todoId));
    todo.text = text;
  }

  function editColor(todoId, color) {
    const todo = todos.value.find(({ id }) => [id].some((id) => id === todoId));
    todo.background = color;
  }

  function moveTodo(todoId, moveValue) {
    const index = todos.value.findIndex(({ id }) => [id].some((id) => id === todoId));
    const todo = todos.value.find(({ id }) => [id].some((id) => id === todoId));

    let newPosition = index + moveValue;

    const movedTodos = JSON.parse(JSON.stringify(todos.value));
    if (newPosition >= todos.value.length) newPosition = todos.value.length;

    movedTodos.splice(index, 1);
    movedTodos.splice(newPosition, 0, JSON.parse(JSON.stringify(todo)));

    todos.value = movedTodos;
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
