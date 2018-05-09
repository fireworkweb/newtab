import Vue from 'vue';
import App from './components/App.vue';
import Section from './components/Section.vue';
import Item_link from './components/Item_link.vue';
import Item_birthday from './components/Item_birthday.vue';
import VModal from 'vue-js-modal';

Vue.component('sections', Section);
Vue.component('item-link', Item_link);
Vue.component('item-birthday', Item_birthday);

Vue.use(VModal);

new Vue({
    el: '#app',
    render: h => h(App),
});
