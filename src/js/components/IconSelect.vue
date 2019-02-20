<template>
    <v-select v-model="mutableValue" :options="options" label="title">
        <template slot="selected-option" slot-scope="selected">
            <i class="fa-pull-left" :class="selected.title"></i>
            {{ selected.title }}
        </template>
        <template slot="option" slot-scope="option">
            <i :class="option.title"></i>
            {{ option.title }}
        </template>
    </v-select>
</template>

<script>
import Vue from 'vue';
import VSelect from 'vue-select';
import json from './icons.json';

Vue.component('v-select', VSelect);

export default {
    props: {
        value: {
            default: null,
        },
    },

    data: () => ({
        options: json.icons,
    }),

    computed: {
        mutableValue: {
            get () {
                return this.value;
            },

            set (newValue) {
                this.$emit('input', newValue);
            },
        },
    },
};
</script>
