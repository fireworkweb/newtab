<template>
    <div>
        <button
            class="newtab__item_button newtab__item_button--second"
            @click="removeItem(sectionKey, itemKey)"
        >
            <i class="fas fa-trash-alt"></i>
        </button>

        <button
            class="newtab__item_button newtab__item_button--first"
            @click="openItemModal(sectionKey, itemKey)"
        >
            <i class="fas fa-edit"></i>
        </button>

        <a class="newtab__item_body" :href="item.url">
            <span v-if="item.icon" class="newtab__item_icon">
                <i class="fa-5x" :class="item.icon"></i>
            </span>

            <span v-else-if="item.image" class="newtab__item_image">
                <img :src="item.image" :class="{ whitescale: item.whitescale }">
            </span>

            <span v-if="item.title" v-text="item.title"></span>
        </a>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    props: {
        item: {
            type: Object,
        },
        itemKey: {
            type: Number,
        },
        sectionKey: {
            type: Number,
        },
    },

    data: () => ({
        itemModal: {
            sectionKey: null,
            itemKey: null,
            modalName: '',
            title: '',
            icon: '',
            image: '',
            whitescale: false,
            url: '',
        },

        sectionModal: {
            sectionKey: null,
            modalName: '',
            title: '',
        },

        birthdayModal: {
            sectionKey: null,
            itemKey: null,
            name: '',
            date: '',
            modalName: '',
            import: '',
        },

        birthdayMonthModal : [],

        allBirthdayModal : [],

    }),
};
</script>
