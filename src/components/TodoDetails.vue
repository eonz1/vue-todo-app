<script setup>
import Calendar from 'primevue/calendar';
import { useTodoStore } from '@/stores/todo';
import { ref } from 'vue';
import dayjs from 'dayjs';
import ConfirmPopup from 'primevue/confirmpopup';
import { useConfirm } from 'primevue/useconfirm';
import TodoEdit from '@/components/TodoEdit.vue';
import Button from 'primevue/button';
import { getTextColorByBackgroundColor } from '@/assets/js/common';

const todoStore = useTodoStore();

const props = defineProps({
  todo: {
    id: Number,
    text: String,
    isDone: Boolean,
    date: String
  }
});

const todoDate = ref(props.todo.date);

const editDate = (date) => {
  todoDate.value = dayjs(date).format('YYYY-MM-DD');

  todoStore.editDate(props.todo.id, todoDate.value);
};

const confirm = useConfirm();

const deletePopup = (event) => {
  confirm.require({
    target: event.currentTarget,
    icon: 'pi pi-exclamation-circle',
    message: '정말로 삭제하시겠습니까?',
    acceptLabel: '예',
    acceptClass: 'p-button-text p-button-danger',
    rejectLabel: '아니요',
    rejectClass: 'p-button-text p-button-plain',
    accept: () => {
      todoStore.removeTodo(props.todo.id);
    }
  });
};

const todoEdit = ref(null);
</script>

<template>
  <div
    class="todo"
    :style="{
      background: '#' + todo.background,
      color: getTextColorByBackgroundColor(todo.background)
    }"
  >
    <div class="move-buttons">
      <Button icon="pi pi-angle-up" text rounded @click="todoStore.moveTodo(todo.id, -1)" /><br />
      <Button icon="pi pi-angle-down" text rounded @click="todoStore.moveTodo(todo.id, 1)" />
    </div>

    <Calendar
      v-model="todoDate"
      dateFormat="yy-mm-dd"
      showIcon
      @update:model-value="editDate($event)"
    />

    <h3 :class="{ done: todo.isDone }" @click="todoStore.toggleCheck(todo.id)">
      {{ todo.text }}
    </h3>

    <span class="p-buttonset">
      <button class="p-button p-button-warning" @click="todoEdit.setVisibleTrue">
        <span class="pi pi-pencil p-button-icon"></span>
      </button>
      <button class="p-button p-button-danger" @click="deletePopup($event)">
        <span class="pi pi-trash p-button-icon"></span>
      </button>
    </span>

    <ConfirmPopup id="confirm" aria-label="popup" />

    <TodoEdit :todo="todo" ref="todoEdit"></TodoEdit>
  </div>
</template>

<style>
.todo {
  padding: 10px;
  margin: 20px auto;
  border-radius: 4px;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 953px;
}

.todo h3 {
  display: inline-block;
  width: 60%;
  margin: 0 10px;
}
.todo h3:hover {
  cursor: pointer;
}

.icons {
  text-align: right;
}

.p-calendar {
  margin: 0 10px;
  max-width: 170px;
}

.done {
  text-decoration: line-through;
  color: #999;
}
</style>
