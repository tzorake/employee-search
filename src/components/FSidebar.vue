<template>
  <div class="sidebar">
    <div class="search">
      <p class="title">Поиск сотрудников</p>
      <input
        type="text"
        class="search__input"
        placeholder="Введите id или имя"
        v-model="rawSearchText"
      />
    </div>

    <div class="results">
      <p class="title">Результаты</p>
      <p class="placeholder" v-if="!rawSearchText">начните поиск</p>
      <p class="placeholder" v-else-if="searchResults.length === 0">
        ничего не найдено
      </p>
      <div class="list-container" v-else>
        <div class="list">
          <FCard
            v-for="user in searchResults"
            :key="user.username"
            :user="user"
            :class="{ selected: modelValue?.username === user.username }"
            @click="$emit('update:modelValue', user)"
          >
          </FCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, defineProps } from "vue";
import { useStore } from "vuex";
import FCard from "./FCard.vue";

const store = useStore();
const props = defineProps({
  modelValue: {
    type: Object,
  },
});

const rawSearchText = ref("");

const searchEntries = computed(() => {
  return rawSearchText.value
    .split(",")
    .map((entry) => entry.trim())
    .filter((entry) => entry);
});
const filteredEntries = computed(() => {
  return {
    id: searchEntries.value.filter((entry) => /^\d+$/.test(entry)),
    name: searchEntries.value.filter((entry) => !/^\d+$/.test(entry)),
  };
});

const searchResults = computed(() => {
  const users = store.state.users;
  if (users.length === 0) {
    store.dispatch("fetchUsers");
  }

  // Get users and filter unique non-undefined values
  const objects = [
    ...filteredEntries.value.id.map((entry) =>
      store.getters.getUserById(entry)
    ),
    ...filteredEntries.value.name.map((entry) =>
      store.getters.getUserByName(entry)
    ),
  ]
    .filter((item) => item)
    .filter(
      (value, index, array) => array.map((x) => x.id).indexOf(value.id) == index
    );

  return objects;
});
</script>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  border-right: 1px solid #dededd;
  background-color: #fdfdfd;
}

.placeholder {
  color: #76787d;
}

.title {
  font-weight: bold;
}

.search {
  display: flex;
  flex-direction: column;

  &__input {
    flex-grow: 1;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    border: 1.5px solid #e9ecef;
  }
}

.list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-right: 0.5rem;

  &-container {
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar {
      width: 12px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #555;
    }
  }
}
</style>
