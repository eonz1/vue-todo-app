<script setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import { useTodoStore } from '@/stores/todo';
import ColorPicker from 'primevue/colorpicker';

const props = defineProps({
  todo: {
    id: Number,
    text: String,
    isDone: Boolean,
    date: String,
    background: String
  }
});
const todoText = ref(props.todo.text);
const todoBgColor = ref(props.todo.background);

const todoStore = useTodoStore();
const visible = ref(false);

const confirm = () => {
  todoStore.editText(props.todo.id, todoText.value);
  todoStore.editColor(props.todo.id, todoBgColor.value);

  visible.value = false;
};

const cancel = () => {
  todoText.value = props.todo.text;
  todoBgColor.value = props.todo.background;

  visible.value = false;
};

const setVisibleTrue = () => {
  visible.value = true;
};
defineExpose({
  setVisibleTrue,
  todoBgColor
});
</script>

<template>
  <Dialog v-model:visible="visible" modal header="수정" :style="{ width: '50vw' }">
    <Textarea v-model="todoText" autoResize></Textarea>
    <ColorPicker v-model="todoBgColor" format="hex" />
    <span class="p-buttonset" :style="{ float: 'right' }">
      <button class="p-button p-button-text p-button-plain" @click="cancel()">
        <span class="p-button-label">취소</span>
      </button>
      <button class="p-button p-button-text" @click="confirm()">
        <span class="p-button-label">수정</span>
      </button>
    </span>
  </Dialog>
</template>

<style>
textarea {
  width: 98%;
}
</style>
