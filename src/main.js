import Vue from 'vue';
import App from './App.vue';
import Section from './components/Section.vue';
import ItemLink from './components/ItemLink.vue';
import ItemBirthday from './components/ItemBirthday.vue';
import VModal from 'vue-js-modal';
import IconSelect from './components/IconSelect.vue';

Vue.component('sections', Section);
Vue.component('item-link', ItemLink);
Vue.component('item-birthday', ItemBirthday);
Vue.component('icon-select', IconSelect);

Vue.use(VModal);

new Vue({
    el: '#app',
    render: h => h(App),
});
