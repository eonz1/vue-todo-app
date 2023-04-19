<script setup>
import { useTodoStore } from '@/stores/todo.js';
import { ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { v4 } from 'uuid';
import Calendar from 'primevue/calendar';
import dayjs from 'dayjs';

const todoStore = useTodoStore();
const newTodo = ref('');
const newTodoDate = ref(dayjs().format('YYYY-MM-DD'));

const handleSubmit = () => {
  if (newTodo.value.length > 0) {
    todoStore.addTodo({
      id: v4(),
      date: newTodoDate.value,
      text: newTodo.value,
      isDone: false,
      background: 'ffffff'
    });

    newTodo.value = '';
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <Calendar id="newTodoDate" v-model="newTodoDate" dateFormat="yy-mm-dd" showIcon />
    <InputText type="text" placeholder="할 일을 입력해주세요" v-model="newTodo" />
    <Button class="p-datepicker-trigger" type="submit" severity="success">추가</Button>
  </form>
</template>
