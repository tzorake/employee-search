import { fetchUsers } from '@/api';
import { createStore } from 'vuex'

export default createStore({
  state: {
    users: [],
  },
  getters: {
    getUserById: (state) => (id) => {
      return state.users.find(user => user.id == id)
    },
    getUserByName: (state) => (name) => {
      return state.users.find(user => user.username === name)
    },
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      const users = await fetchUsers();
      users.forEach(user => {
        user.image = "placeholder.png";
        user.about = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed, recusandae quam deleniti voluptate sequi dolor omnis aspernatur quisquam, illo, suscipit minima distinctio in modi nihil inventore maiores blanditiis explicabo cupiditate? Sapiente sequi itaque accusantium, sint, quos animi nostrum sunt voluptates ex rerum fugit numquam corrupti eius, sit quidem molestias? Rerum repellat, ratione quae aliquam error quo est voluptas molestias impedit.";
      });

      commit("setUsers", users);
    },
  },
})
