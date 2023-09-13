<template>
  <div class="card-view">
    <div class="image-container">
      <img :src="props.user.image" alt="image" class="image" />
    </div>
    <div class="info">
      <div class="contacts">
        <div class="name">{{ user.name }}</div>
        <div class="email">
          <span class="title">email: </span>
          <span class="text">{{ user.email }}</span>
        </div>
        <div class="phone">
          <span class="title">phone: </span>
          <span class="text">{{ user.phone }}</span>
        </div>
      </div>
      <div class="about">
        <span class="title">О себе:</span>
        <div class="text">{{ user.about }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  user: {
    type: Object,
  },
});
</script>

<style scoped lang="scss">

.image {
  width: 100%;
  border: 1px solid var(--grey-100);

  &-container {
    width: calc(50% - 2rem);
  }
}

.name {
  font-weight: bold;
}

.title {
  font-weight: bold;
}

.email, .phone {
  word-wrap: normal;
}

.text {
  color: var(--grey-200);
}

.contacts {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.about {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  > .title, .name {
    font-size: 1rem;
  }
}

.info {
  display: flex;
  flex-direction: column;
  width: calc(50% - 2rem);
  gap: 1.25rem;
}

.card-view {
  display: flex;
  padding: 2rem 1.25rem;
  gap: 4rem;
  font-size: 0.875rem;
}
</style>
