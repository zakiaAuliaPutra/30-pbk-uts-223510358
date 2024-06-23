import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Assuming your router configuration is in 'router/index.js'
import { createPinia } from 'pinia';
import 'quasar/dist/quasar.css'; // Import Quasar CSS from dist folder
import '@quasar/extras/material-icons/material-icons.css';
import { Quasar } from 'quasar';

// Define the feature flag before creating the app
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = true;

// Create the Vue app instance
const app = createApp(App);

// Create Pinia store
const pinia = createPinia();

// Use plugins and mount the app
app.use(router);
app.use(pinia);
app.use(Quasar, {
  config: {},
});

// Mount the app to the DOM element with id 'app'
app.mount('#app');
