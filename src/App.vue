<template>
  <div class="container">
    <div class="header">
      <span class="logo">Жилфонд</span>
      <span class="user">Пользователь</span>
    </div>
    <FFindEmployeeForm class="form"></FFindEmployeeForm>
  </div>
</template>

<script setup>
import FFindEmployeeForm from "./components/FFindEmployeeForm.vue";
</script>

<style scoped>
.logo {
  color: #E31F24;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form {
  flex-grow: 1;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem;
  height: calc(100% - 6rem);
  color: #333;
}


</style>
