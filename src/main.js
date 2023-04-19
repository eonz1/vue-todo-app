import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import PrimeVue from 'primevue/config';
// theme
import 'primevue/resources/themes/soho-light/theme.css';
// core
import 'primevue/resources/primevue.min.css';
// icons
import 'primeicons/primeicons.css';

import ConfirmationService from 'primevue/confirmationservice';

const app = createApp(App);

app.use(createPinia());
app.use(PrimeVue);
app.use(ConfirmationService);

app.mount('#app');
