<script setup>
import InputText from 'primevue/inputtext';
import { useTodoStore } from '@/stores/todo.js';
import Button from 'primevue/button';

const todoStore = useTodoStore();
</script>

<template>
  <span class="p-input-icon-left">
    <i class="pi pi-search" />
    <InputText v-model="todoStore.searchWord" placeholder="검색어를 입력해주세요" />
    <Button icon="pi pi-times" plain text rounded @click="todoStore.resetSearchWord" />
  </span>
</template>
