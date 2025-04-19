import App from './App.vue';
import i18next from 'i18next'; 
import i18NextVue from 'i18next-vue'; 
import './assets/styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';

import { createApp } from 'vue';

const i18n = i18next.createInstance();
i18n.init({
  lng: 'pt', 
  resources: {
    pt: {
      translation: {
        // searchPlaceholder: "Search here...",
        // tableHeading: "Table Data",
        // Adicione mais traduções aqui
      }
    },
    en: {
      translation: {
        // searchPlaceholder: "Pesquise aqui...",
        // tableHeading: "Dados da Tabela",
        // Adicione mais traduções aqui
      }
    }
  }
});

const app = createApp(App);
app.use(i18NextVue, { i18next });
app.mount('#app');

