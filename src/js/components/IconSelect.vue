<template>
    <v-select
        v-model="mutableValue"
        :options="options"
        label="title">
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
import VSelect from 'vue-select';
import json from './icons.json';

export default {
    components: {VSelect},

    props: {
        value: {
            type: String,
            default: null,
        },
    },

    data: () => ({
        options: json,
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
