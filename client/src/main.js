import Vue from 'vue';
import App from './app.vue';
import wysiwyg from "vue-wysiwyg";
Vue.use(wysiwyg, {});

new Vue(App).$mount('#app');
