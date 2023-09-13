<template>
  <div class="find-employee-form">
    <FSidebar v-model="selectedUser"></FSidebar>
    <div class="content">
      <FCardView :user="selectedUser" v-if="selectedUser"></FCardView>
      <div class="placeholder" v-else>
        <span class="text">
          Выберите сотрудника, чтобы посмотреть его профиль
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import FSidebar from "./FSidebar.vue";
import FCardView from "./FCardView.vue";

const selectedUser = ref();
</script>

<style scoped>
.find-employee-form {
  display: flex;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px var(--grey-250);
}

.content {
  display: flex;
  flex-grow: 1;
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
