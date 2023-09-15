<template>
  <div class="app">
    <header class="header">
      <a class="logo">Жилфонд</a>
      <span class="user">Пользователь</span>
    </header>
    <FEmployeeSearchForm></FEmployeeSearchForm>
  </div>
</template>

<script setup>
import FEmployeeSearchForm from "./components/FEmployeeSearchForm.vue";
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}

.app {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem;
  height: 100vh;
  color: var(--grey-850);
  @media (max-width: 1050px) {
    padding: 1.5rem;
    height: 90vh;
  }
}

.logo {
  color: var(--red-100);
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

.employee-search-form {
  flex-grow: 1;
}
</style>
