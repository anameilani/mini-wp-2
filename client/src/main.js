import Vue from 'vue';
import App from './app.vue';
import wysiwyg from "vue-wysiwyg";
import GSignInButton from 'vue-google-signin-button'

Vue.use(GSignInButton)
Vue.use(wysiwyg, {});

new Vue(App).$mount('#app');
