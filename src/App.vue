<script setup>
import { useTodoStore } from '@/stores/todo.js';
import TodoDetails from '@/components/TodoDetails.vue';
import TodoAddForm from '@/components/TodoAddForm.vue';
import TodoSearch from '@/components/TodoSearch.vue';

const todoStore = useTodoStore();
</script>

<template>
  <main>
    <header>
      <img src="./assets/img/pinia-logo.svg" alt="피니야 로고" />
      <h1>Pinia To-Do List</h1>
    </header>

    <div class="todo-forms">
      <TodoAddForm />
      <TodoSearch />
    </div>

    <transition-group name="slide-fade" tag="div" class="todo-list">
      <TodoDetails v-for="todo in todoStore.getTodos" :key="todo.id" :todo="todo" />
    </transition-group>
  </main>
</template>

<style scoped>
header {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  min-width: 910px;
}

.todo-list {
  max-width: 1000px;
  margin: 20px auto;
}

.todo-forms {
  padding: 10px 0 10px 10px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 950px;
  max-width: 1040px;
}

header img {
  max-width: 60px;
  transform: rotate(-10deg);
}

header h1 {
  margin: 0;
  font-size: 2em;
  padding-top: 25px;
  margin-left: 15px;
  color: #777;
  transform: rotate(2deg);
}

body {
  background: #525252;
}

.slide-fade-enter-active,
.slide-fade-move {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.6s cubic-bezier(1, 1, 1, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}

.slide-fade-leave-active {
  position: absolute;
}

/* 
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
} */
</style>
