<template>
  <aside class="sidebar">
    <div class="search">
      <p class="title">Поиск сотрудников</p>
      <input
        type="text"
        class="search__input"
        placeholder="Введите ID или Имя"
        v-model="rawSearchText"
        :disabled="isLoading"
      />
    </div>

    <p class="title">Результаты</p>
    <div class="results">
      <template v-if="isLoading">
        <div class="loader-container">
          <div class="loader"></div>
        </div>
      </template>
      <template v-else>
        <template v-if="!isErrorOccured">
          <p class="placeholder" v-if="!rawSearchText">Начните поиск</p>
          <p class="placeholder" v-else-if="searchResults.length === 0">Ничего не найдено</p>
          <div class="list-container">
            <TransitionGroup mode="out-in" name="list" class="list" tag="div">
              <FCard
                v-for="user in searchResults"
                :key="user.username"
                :user="user"
                :class="{ selected: modelValue?.username === user.username }"
                @click="$emit('update:modelValue', user)"
              >
              </FCard>
            </TransitionGroup>
          </div>
        </template>
        <template v-else>
          <p class="error">{{ errorString }}</p>
        </template>
      </template>
    </div>
  </aside>
</template>

<script setup>
import { computed, ref, defineProps, defineEmits, onMounted, watch } from "vue";
import { useStore } from "vuex";
import FCard from "./FCard.vue";

const store = useStore();
const props = defineProps({
  modelValue: {
    type: Object,
  },
});
const emit = defineEmits(["update:modelValue"]);

let iota = 0;
const Error = {};
Error.NoError = iota++;
Error.ServerError = iota++;
Error.InvalidRequest = iota++;

const errorString = ref("");
const errorCode = ref(Error.NoError);
const isErrorOccured = computed(() => errorCode.value !== Error.NoError);

const isLoading = ref(false);

const rawSearchText = ref("");
const isInputValid = computed(() => {
  return rawSearchText.value.length === 0 || !/[^\w\s,]/.test(rawSearchText.value);
});

watch(isInputValid, (newValue) => {
  if (!newValue) {
    if (errorCode.value === Error.NoError) {
      errorString.value = "Неверный запрос";
      errorCode.value = Error.InvalidRequest;
    }
  } else {
    if (errorCode.value === Error.InvalidRequest) {
      errorString.value = "";
      errorCode.value = Error.NoError;
    }
  }
});

const searchEntries = computed(() => {
  return rawSearchText.value
    .replaceAll(" ", ",")
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

// Get users and filter unique non-undefined values
const searchResults = computed(() => {
  const users = [
    ...filteredEntries.value.id.map((entry) => store.getters.getUserById(entry)),
    ...filteredEntries.value.name.map((entry) => store.getters.getUserByName(entry)),
  ]
    .filter((item) => item)
    .filter((value, index, array) => array.map((x) => x.id).indexOf(value.id) == index);

  return users;
});

watch(searchResults, (newValue) => {
  if (props.modelValue && !newValue.find((item) => item.id === props.modelValue.id)) {
    emit("update:modelValue", undefined);
  }
});

onMounted(() => {
  if (store.state.users.length === 0) {
    isLoading.value = true;
    store
      .dispatch("fetchUsers")
      .catch((error) => {
        console.warn(error);
        errorString.value = "Ошибка сервера";
        errorCode.value = Error.ServerError;
      })
      .finally(() => {
        isLoading.value = false;
      });
  }
});
</script>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--grey-400);
  background-color: white;
  width: 400px;
  padding: 0.75rem;
  flex-shrink: 0;
  border-radius: 10px 0 0 10px;
  overflow: auto;
  @media (max-width: 1050px) {
    border-radius: 10px;
    width: calc(100% - 1.5rem);
    border-right: none;
  }
}

.results {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
}

.placeholder {
  color: var(--grey-200);
}

.error {
  color: var(--red-100);
}

.title {
  font-weight: bold;
}

.title,
.placeholder,
.error {
  margin: 1rem 0.5rem;
}

.search {
  display: flex;
  flex-direction: column;

  &__input {
    flex-grow: 1;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    border: 1.5px solid var(--grey-600);
    min-width: 10rem;
    margin: 0.5rem;
    transition: all 0.2s ease-out;

    &:focus {
      border: 1.5px solid black;
      outline: 0;
    }
  }
}

.list {
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
  gap: 0.75rem;

  > * {
    margin: 0 0.5rem;
  }

  &-container {
    overflow-y: auto;
    overflow-x: hidden;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px var(--grey-150);
      border-radius: 10px;
      background-color: var(--grey-700);
    }

    &::-webkit-scrollbar {
      width: 12px;
      background-color: var(--grey-700);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px var(--grey-150);
      background-color: var(--grey-800);
    }
  }

  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateX(2rem);
  }
}

.loader {
  width: 50px;
  height: 50px;
  border: 8px solid var(--grey-900);
  border-radius: 50%;
  border-top-color: var(--grey-800);
  animation: spin 1s ease infinite;

  &-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
