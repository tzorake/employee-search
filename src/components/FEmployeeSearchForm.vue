<template>
  <main class="employee-search-form">
    <FSidebar v-model="selectedUser" />
    <div
      class="content"
      :class="{
        'content--selected-user': selectedUser,
      }"
    >
      <FCardView
        :user="selectedUser"
        @drop-select="selectedUser = undefined"
        v-if="selectedUser"
      ></FCardView>
      <div class="placeholder" v-else>
        <span class="text"> Выберите сотрудника, чтобы посмотреть его профиль </span>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import FSidebar from "./FSidebar.vue";
import FCardView from "./FCardView.vue";

const selectedUser = ref();
</script>

<style scoped lang="scss">
.employee-search-form {
  position: relative;
  display: flex;
  flex-grow: 1;
  border-radius: 10px;
  background-color: var(--grey-500);
  box-shadow: 0px 0px 10px 0px var(--grey-250);
}

.content {
  position: relative;
  display: flex;
  flex-grow: 1;
  height: 100%;
  overflow: hidden;

  @media (max-width: 1050px) {
    position: absolute;
    display: none;
  }

  &--selected-user {
    display: flex;
  }
}

.placeholder {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  word-wrap: normal;
  color: var(--grey-200);
}

.text {
  text-align: center;
  padding: 1rem;
}
</style>
