<template>
  <div class="todo-container">
    <!-- Komponen Form untuk menambahkan todo -->
    <div v-if="showAddTodoForm">
      <input :value="newTodo" @input="$emit('update:newTodo', $event.target.value)" placeholder="Masukkan Kegiatan">
      <button @click="addTodo">Tambah Kegiatan</button>
    </div>
    
    <br><br>
    <button @click="hideCompleted = !hideCompleted">{{ hideCompleted ? 'Tampilkan Semua' : 'Sembunyikan yang sudah selesai' }}</button>
    <ul>
      <li v-for="(todo, index) in visibleTodos" :key="todo.id" class="todo-item">
        <span :class="{ completed: todo.completed }" @click="toggleComplete(todo)">{{ todo.text }}</span>
        <template v-if="editingIndex === index">
          <input
            :value="editedTaskTitle"
            @input="$emit('update:editedTaskTitle', $event.target.value)"
            @keyup.enter="saveTask(index)"
            @keyup.esc="cancelEdit"
            class="form-control"
          />
          <button @click="saveTask(index)" class="btn btn-sm btn-success mx-2">Simpan</button>
          <button @click="cancelEdit" class="btn btn-sm btn-secondary">Batal</button>
        </template>
        <div class="action-buttons">
          <button v-if="!todo.completed" @click="completeTodo(todo.id)" class="complete-btn">Selesai</button>
          <button v-if="todo.completed" @click="unCompleteTodo(todo.id)" class="incomplete-btn">Belum Selesai</button>
          <button @click="editTask(index)" class="btn btn-sm btn-primary mx-2">Edit</button>
          <button @click="removeTodo(todo.id)" class="delete-btn">Hapus</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    todos: Array,
    newTodo: String,
    hideCompleted: Boolean,
    editingIndex: Number,
    editedTaskTitle: String,
    showAddTodoForm: Boolean
  },
  emits: ['update:newTodo', 'add-todo', 'toggle-complete', 'complete-todo', 'uncomplete-todo', 
          'edit-task', 'save-task', 'cancel-edit', 'remove-todo', 'update:editedTaskTitle'],
  methods: {
    addTodo() {
      this.$emit('add-todo');
    },
    toggleComplete(todo) {
      this.$emit('toggle-complete', todo);
    },
    completeTodo(id) {
      this.$emit('complete-todo', id);
    },
    unCompleteTodo(id) {
      this.$emit('uncomplete-todo', id);
    },
    editTask(index) {
      this.$emit('edit-task', index);
    },
    saveTask(index) {
      this.$emit('save-task', index);
    },
    cancelEdit() {
      this.$emit('cancel-edit');
    },
    removeTodo(id) {
      this.$emit('remove-todo', id);
    }
  },
  computed: {
    visibleTodos() {
      return this.hideCompleted ? this.todos.filter(todo => !todo.completed) : this.todos;
    }
  }
}
</script>

<style>
.todo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background-color: #3ec6d8;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 20px;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  color: #333; /* Warna teks hitam */
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin: 5px;
}

.complete-btn {
  background-color: #4CAF50; /* Warna hijau */
  color: white;
}

.incomplete-btn {
  background-color: #f44336; /* Warna merah */
  color: white;
}

.delete-btn {
  background-color: #cccccc; /* Warna abu-abu */
  color: black;
}

ul {
  list-style: none;
  padding: 0;
  width: 100%;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: rgb(108, 81, 81);
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.completed {
  text-decoration: line-through;
  color: #ccc; /* Warna abu-abu untuk teks yang selesai */
}

.action-buttons {
  display: flex;
}

.action-buttons button {
  margin-left: 5px;
}
</style>
