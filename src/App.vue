<template>
  <div id="app">
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="custom-navbar">
        <q-toolbar>
            <q-btn flat round dense class="header-icon" href="https://www.instagram.com/zakiaauliaputra?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">
            <q-icon name="assignment_ind" />
          </q-btn>
          <h1 class="header-title">FINAL PROJECT ZAKIA</h1>
          <div class="nav-links">
            <q-btn flat round dense to="/" exact-active-class="active" class="q-item">
              <q-icon name="home" class="q-item-icon" />
              <q-item-label>Home</q-item-label>
            </q-btn>
            <q-btn flat round dense to="/todolists" exact-active-class="active" class="q-item">
              <q-icon name="checklist" class="q-item-icon" />
              <q-item-label>Todos</q-item-label>
            </q-btn>
            <q-btn flat round dense to="/posts" exact-active-class="active" class="q-item">
              <q-icon name="post_add" class="q-item-icon" />
              <q-item-label>Post</q-item-label>
            </q-btn>
            <q-btn flat round dense to="/albums" exact-active-class="active" class="q-item">
              <q-icon name="photo_album" class="q-item-icon" />
              <q-item-label>Album</q-item-label>
            </q-btn>
          </div>
        </q-toolbar>
      </q-header>
      
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
.custom-navbar {
  background: linear-gradient(135deg, #432222, #b50000) !important;
  color: #ffffff; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  border-bottom: 3px solid #000000; 
}

.custom-navbar .q-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between; 
}

.header-icon {
  margin-right: 20px;
}

.header-title {
  flex-grow: 1; 
  text-align: center;
  color: #ffffff;
  font-weight: bold;
  font-size: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); 
}


.nav-links {
  display: flex;
  justify-content: center; 
}

.custom-navbar .q-item {
  margin: 0 15px;
  display: flex;
  align-items: center;
  transition: transform 0.2s; 

}

.custom-navbar .q-item:hover {
  transform: scale(1.1); 
}

.custom-navbar .q-item-icon {
  margin-right: 8px; 
}

.custom-navbar .q-item-label {
  color: #ffffff;
  font-weight: bold;
}

.custom-navbar .q-item:hover .q-item-label {
  color: #ffffff; 
}

.custom-navbar .active .q-item-label {
  color: #ffffff; 
}

@media (max-width: 768px) {
  .custom-navbar .q-toolbar {
    flex-direction: column;
  }

  .header-title {
    text-align: center;
    margin: 10px 0;
  }

  .nav-links {
    flex-direction: column;
  }

  .custom-navbar .q-item {
    margin: 10px 0;
  }
}
</style>
