<template>
  <div class="card">
    <img :src="props.user.image" class="photo" alt="image" />
    <div class="info">
      <div class="username">{{ props.user.username }}</div>
      <div class="email">{{ props.user.email }}</div>
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
  width: 10rem;
}

.card {
  display: flex;
  border: 1.5px solid var(--all-colors-gray-gray-200, var(--grey-300));
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}

.selected > .info {
  background-color: var(--grey-100);
}
</style>
