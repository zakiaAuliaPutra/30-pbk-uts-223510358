<template>
  <h1>Selamat Datang Di To Do List Zakia</h1>
  <div class="todo-container">
    <!-- Tombol untuk menampilkan/menyembunyikan postingan -->
    <button @click="toggleShowingPosts">{{ showingPosts ? 'Sembunyikan Postingan' : 'Tampilkan Postingan' }}</button>
    <!-- Tombol untuk menambahkan tugas -->
    <button @click="showAddTodoForm = true">Tambahkan Todo</button>

    <!-- Jika tombol "Tampilkan Postingan" diklik -->
    <div v-if="showingPosts">
      <!-- Select untuk memilih pengguna -->
      <select v-model="selectedUser">
        <option value="">Pilih Pengguna</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      
      <!-- List postingan -->
      <ul v-if="selectedUser">
        <li v-for="post in userPosts" :key="post.id">{{ post.title }}</li>
      </ul>
    </div>

    <!-- Komponen TodoList -->
    <TodoList
      :todos="todos"
      :newTodo="newTodo"
      :hideCompleted="hideCompleted"
      :editingIndex="editingIndex"
      :editedTaskTitle="editedTaskTitle"
      :showAddTodoForm="showAddTodoForm"
      @update:newTodo="newTodo = $event"
      @add-todo="addTodo"
      @toggle-complete="toggleComplete"
      @complete-todo="completeTodo"
      @uncomplete-todo="unCompleteTodo"
      @edit-task="editTask"
      @save-task="saveTask"
      @cancel-edit="cancelEdit"
      @remove-todo="removeTodo"
      @update:editedTaskTitle="editedTaskTitle = $event"
    />
  </div>
</template>

<script>
import { ref, watch } from "vue";
import TodoList from './components/TodoList.vue';

export default {
  name: 'App',
  components: {
    TodoList
  },
  data() {
    return {
      todos: [],
      newTodo: '',
      nextId: 1,
      hideCompleted: false,
      editingIndex: null,
      editedTaskTitle: '',
      users: [],
      selectedUser: "",
      userPosts: [],
      showingPosts: false,
      showAddTodoForm: false
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        this.todos.push({ id: this.nextId++, text: this.newTodo, completed: false });
        this.newTodo = '';
        this.showAddTodoForm = false;
      }
    },
    toggleComplete(todo) {
      todo.completed = !todo.completed;
    },
    completeTodo(id) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = true;
      }
    },
    unCompleteTodo(id) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = false;
      }
    },
    editTask(index) {
      this.editingIndex = index;
      this.editedTaskTitle = this.todos[index].text;
    },
    saveTask(index) {
      if (this.editedTaskTitle.trim()) {
        this.todos[index].text = this.editedTaskTitle;
        this.cancelEdit();
      }
    },
    cancelEdit() {
      this.editingIndex = null;
      this.editedTaskTitle = '';
    },
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        this.users = await response.json();
      } catch (error) {
        console.error('Error Fetching Users:', error);
      }
    },
    async fetchUserPosts() {
      if (!this.selectedUser) return;
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
        this.userPosts = await response.json();
      } catch (error) {
        console.error('Error Fetching User Posts:', error);
      }
    },
    toggleShowingPosts() {
      this.showingPosts = !this.showingPosts;
      if (this.showingPosts) {
        this.fetchUsers();
      }
    }
  },
  watch: {
    selectedUser() {
      this.fetchUserPosts();
    }
  }
}
</script>

<style>
/* Semua style bisa tetap ada di sini atau dipindahkan ke masing-masing komponen */
</style>
