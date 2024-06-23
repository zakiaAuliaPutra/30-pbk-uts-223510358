<template>
  <div class="container">
    <div class="posts-container">
      <h2 class="center-text">Postingan</h2>
      <div class="center-text">
        <select v-model="selectedUser" @change="fetchPosts" class="user-select">
          <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
        </select>
      </div>
      
      <!-- Loading Indicator -->
      <div v-if="loading" class="loading-indicator">
        Loading...
      </div>
      
      <table v-if="!loading && posts.length > 0" class="posts-table">
        <thead>
          <tr>
            <th class="post-title">Judul</th>
            <th class="post-body">Isi</th>
            <th class="post-actions">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in posts" :key="post.id" class="post-item">
            <td class="post-title">{{ post.title }}</td>
            <td class="post-body">{{ post.body }}</td>
            <td class="post-actions">
              <button @click="editPost(post.id)" class="btn primary">Edit</button>
              <button @click="deletePost(post.id)" class="btn secondary">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- Show message if no posts available -->
      <div v-if="!loading && posts.length === 0" class="no-posts">
        Tidak ada postingan yang tersedia untuk pengguna ini.
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostsComponent',
  data() {
    return {
      users: [],
      posts: [],
      selectedUser: null,
      loading: false
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
          this.users = users;
        });
    },
    fetchPosts() {
      this.loading = true;
      this.posts = [];

      if (this.selectedUser) {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`)
          .then(response => response.json())
          .then(posts => {
            this.posts = posts;
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.loading = false;
      }
    },
    editPost(postId) {
      const post = this.posts.find(post => post.id === postId);
      const newTitle = prompt('Edit Judul', post.title);
      const newBody = prompt('Edit Isi', post.body);

      if (newTitle !== null && newBody !== null) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: newTitle, body: newBody, userId: this.selectedUser })
        })
          .then(response => response.json())
          .then(updatedPost => {
            post.title = updatedPost.title;
            post.body = updatedPost.body;
          });
      }
    },
    deletePost(postId) {
      if (confirm('Apakah Anda yakin ingin menghapus postingan ini?')) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
          method: 'DELETE'
        })
          .then(() => {
            this.posts = this.posts.filter(post => post.id !== postId);
          });
      }
    }
  }
};
</script>

<style>
/* Existing styles */

.center-text {
  text-align: center;
}

.loading-indicator {
  margin-top: 20px;
  text-align: center;
  font-size: 1.2rem;
  color: #888888;
}

.posts-table {
  width: 100%;
  border-collapse: collapse;
}

.posts-table th, .posts-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.posts-table th {
  background-color: #f2f2f2;
  font-size: 1.1rem;
  color: #000; /* Set text color to black for column headers */
}

.posts-table td {
  font-size: 1rem;
  color: #000; /* Set text color to black for table data */
}

.posts-table .post-actions {
  text-align: center;  
  color: #000; /* Set text color to black for action column */
}

.posts-table .post-actions button {
  margin: 5px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.posts-table .post-actions button:hover {
  transform: translateY(-2px);
}

.no-posts {
  text-align: center;
  font-style: italic;
  color: #888888;
  padding: 20px;
}

.user-select {
  margin-bottom: 20px;
  padding: 8px 16px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background-color: #ffffff;
  text-align: center;
}

.user-select:focus {
  outline: none;
  border-color: #007bff;
}

.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.btn.primary {
  background-color: #007bff;
}

.btn.primary:hover {
  background-color: #0056b3;
}

.btn.secondary {
  background-color: #6c757d;
}

.btn.secondary:hover {
  background-color: #5a6268;
}
</style>
