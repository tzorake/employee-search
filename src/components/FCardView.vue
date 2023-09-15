<template>
  <article class="card-view">
    <button class="close-button" @click="emit('dropSelect')">&times;</button>
    <picture class="image-container">
      <img :src="props.user.image" alt="image" class="image" />
    </picture>
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
  </article>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  user: {
    type: Object,
  },
});

const emit = defineEmits(["dropSelect"]);
</script>

<style scoped lang="scss">
.close-button {
  width: 40px;
  height: 40px;
  position: absolute;
  display: none;
  border: none;
  background-color: unset;
  border-radius: 50%;
  cursor: pointer;
  font-size: 2rem;
  top: 5px;
  left: 7px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  &:hover, &:active {
    background-color: var(--grey-100);
  }
  @media (max-width: 1050px) {
    display: block;
  }
}

.image {
  height: 100%;
  width: 100%;
  border: 1px solid var(--grey-100);
  object-fit: cover;

  @media (max-width: 1050px) {
    height: 225px;
  }

  &-container {
    width: calc(50% - 2rem);
    @media (max-width: 1050px) {
      width: 100%;
    }
  }
}

.name {
  font-weight: bold;
}

.title {
  font-weight: bold;
}

.email,
.phone {
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

  > .title,
  .name {
    font-size: 1rem;
  }
}

.info {
  display: flex;
  flex-direction: column;
  width: calc(50% - 2rem);
  gap: 1.25rem;
  flex: 1;
  @media (max-width: 1050px) {
    width: 100%;
  }
}

.card-view {
  position: relative;
  display: inline-flex;
  padding: 2rem 1.25rem;
  gap: 1.25rem;
  font-size: 0.875rem;
  height: 300px;
  background-color: var(--grey-500);
  @media (max-width: 1050px) {
    overflow: auto;
    flex-direction: column;
    height: 100%;
    padding: 3rem 1.25rem 0 1.25rem;
  }
}
</style>
