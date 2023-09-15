<template>
  <div class="card">
    <img :src="props.user.image" class="photo" alt="image" />
    <div class="info">
      <div class="username">{{ props.user.username }}</div>
      <div class="email" :title="props.user.email">{{ props.user.email }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.photo {
  width: 5rem;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-right: 1px solid var(--grey-100);
}

.username {
  font-weight: bold;
}

.email {
  color: var(--grey-200);

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.info {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  transition: background-color 0.3s;
  border-radius: 0 10px 10px 0;
  overflow: hidden;
}

.card {
  display: flex;
  cursor: pointer;
  width: calc(100% - 1rem);
  border: 1.5px solid var(--grey-300);
  border-radius: 10px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  transition: all 0.3s;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:hover,
  &:active {
    border: 1px solid var(--grey-100);
    background-color: var(--grey-700);
  }
}

.selected > .info {
  background-color: var(--grey-100);
}
</style>
