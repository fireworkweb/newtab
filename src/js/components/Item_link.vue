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
    }),

    methods: {
        openItemModal (sectionKey, itemKey) {
            this.itemModal.modalName = itemKey !== undefined ? 'Edit Item' : 'Add Item';

            this.itemModal.sectionKey = sectionKey;
            this.itemModal.itemKey = itemKey;

            this.$modal.show('itemModal');

            if (itemKey !== undefined) {
                let item = this.sections[this.itemModal.sectionKey].items[itemKey];

                this.itemModal.title = item.title;
                this.itemModal.icon = item.icon;
                this.itemModal.image = item.image;
                this.itemModal.whitescale = item.whitescale;
                this.itemModal.url = item.url;
            }
        },

        submitItemModal () {
            let itemKey = this.itemModal.itemKey,
                sectionKey = this.itemModal.sectionKey,
                section = this.sections[sectionKey],
                item = {
                    title: this.itemModal.title,
                    icon: this.itemModal.icon,
                    image: this.itemModal.image,
                    whitescale: this.itemModal.whitescale,
                    url: this.itemModal.url,
                };

            if (itemKey !== undefined) {
                section.items[itemKey] = item;
            } else {
                section.items.push(item);
            }

            this.closeItemModal();
        },

        removeItem (sectionKey, itemKey) {
            if (confirm('Delete item?')) {
                this.sections[sectionKey].items.splice(itemKey, 1);
            }
        },

        closeItemModal () {
            this.itemModal.sectionKey = null;
            this.itemModal.itemKey = null;
            this.itemModal.title = '';
            this.itemModal.icon = '';
            this.itemModal.image = '';
            this.itemModal.whitescale = false;
            this.itemModal.url = '';

            this.$modal.hide('itemModal');
        },
    }
};
</script>
