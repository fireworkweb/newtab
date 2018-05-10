import Vue from 'vue';
import App from './components/App.vue';
import Section from './components/Section.vue';
import ItemLink from './components/ItemLink.vue';
import ItemBirthday from './components/ItemBirthday.vue';
import VModal from 'vue-js-modal';

Vue.component('sections', Section);
Vue.component('item-link', ItemLink);
Vue.component('item-birthday', ItemBirthday);

Vue.use(VModal);

new Vue({
    el: '#app',
    render: h => h(App),
});
