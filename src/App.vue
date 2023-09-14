<template>
  <div class="container">
    <div class="header">
      <span class="logo">Жилфонд</span>
      <span class="user">Пользователь</span>
    </div>
    <FEmployeeSearchForm></FEmployeeSearchForm>
  </div>
</template>

<script setup>
import FEmployeeSearchForm from "./components/FEmployeeSearchForm.vue";
</script>

<style scoped lang="scss">
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

.container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem;
  height: calc(100% - 6rem);
  color: var(--grey-850);
}


</style>
