<template>
  <div class="albums">
    <div class="album-container">
      <h2 class="title">Pilih Album</h2>
      <div v-if="isLoading" class="loading-container">
        <div class="spinner"></div>
      </div>
      <div v-else class="album-table">
        <div class="album-row">
          <label for="albumSelect">Select an album:</label>
          <select id="albumSelect" v-model="selectedAlbumId" @change="handleAlbumChange">
            <option v-for="album in albums" :key="album.id" :value="album.id">{{ album.title }}</option>
          </select>
        </div>

        <div v-if="loading" class="loading-indicator">
        Loading...
      </div>
      
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useAlbumsStore } from '../stores/album';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const albums = ref([]);
    const selectedAlbumId = ref(null);
    const isLoading = ref(true);
    const albumsStore = useAlbumsStore();
    const router = useRouter();

    onMounted(async () => {
      await albumsStore.fetchAlbums();
      albums.value = albumsStore.albums;
      isLoading.value = false;
    });

    const handleAlbumChange = () => {
      if (selectedAlbumId.value) {
        router.push(`/albums/${selectedAlbumId.value}`);
      }
    };

    return {
      albums,
      selectedAlbumId,
      isLoading,
      handleAlbumChange,
    };
  },
});
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
  margin: 5% auto; 
  padding: 0;
  background-color: #f8f9fa;
  color: #ffffff;
}

.albums {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  width: 100vw;
}

.album-container {
  text-align: center;
  background: linear-gradient(135deg, #0046e8bf, #2a505c);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2.5rem; 
  font-weight: bold; 
  color: #ffffff; 
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4); 
}

.album-table {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.album-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

label {
  margin-bottom: 10px;
}

select {
  padding: 5px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

/* Loading Spinner Styles */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
