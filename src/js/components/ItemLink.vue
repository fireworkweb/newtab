<template>
    <div>
        <div class="newtab__item">
            <div class="newtab__item_holder">
                <ul class="newtab__item_buttons" v-if="! lock">
                    <li class="newtab__item_button">
                        <button @click="removeItem(itemKey)">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </li>

                    <li class="newtab__item_button">
                        <button @click="openItemModal()">
                            <i class="fas fa-edit"></i>
                        </button>
                    </li>
                </ul>

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
        </div>

        <modal
            :name="modalName"
            :width="435"
            :height="440"
        >
            <div class="newtab__modal">
                <div class="newtab__modal_header">
                    <h1 class="newtab__modal_title" v-text="itemModal.modalName"></h1>

                    <button class="newtab__modal_close" @click="closeItemModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="newtab__modal_field">
                    <input
                        class="newtab__modal_input"
                        type="text"
                        placeholder="Title"
                        v-model="itemModal.title"
                    >
                </div>

                <div class="newtab__modal_field">
                    <input
                        class="newtab__modal_input"
                        type="text"
                        placeholder="Icon"
                        v-model="itemModal.icon"
                    >
                </div>

                <div class="newtab__modal_field">
                    <input
                        class="newtab__modal_input"
                        type="text"
                        placeholder="Image"
                        v-model="itemModal.image"
                    >
                </div>

                <div class="newtab__modal_field newtab__modal_field--checkbox">
                    <input
                        class="newtab__modal_checkbox"
                        type="checkbox"
                        v-model="itemModal.whitescale"
                    >
                    Image in whitescale
                </div>

                <div class="newtab__modal_field">
                    <input
                        class="newtab__modal_input"
                        type="text"
                        placeholder="URL"
                        v-model="itemModal.url"
                    >
                </div>

                <div class="newtab__modal_footer">
                    <button
                        class="newtab__modal_button"
                        @click="submitItemModal()"
                        v-text="itemModal.modalName"
                    ></button>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true,
        },

        sectionKey: {
            type: Number,
            required: true,
        },

        itemKey: {
            type: Number,
            required: true,
        },

        lock: {
            type: Boolean,
            required: true,
        },
    },

    data: () => ({
        itemModal: {
            modalName: '',
            title: '',
            icon: '',
            image: '',
            whitescale: false,
            url: '',
        },
    }),

    computed: {
        modalName () {
            return 'itemModal' + this.sectionKey + this.itemKey;
        },
    },

    methods: {
        openItemModal () {
            this.itemModal.modalName = 'Edit Item';

            this.itemModal.title = this.item.title;
            this.itemModal.icon = this.item.icon;
            this.itemModal.image = this.item.image;
            this.itemModal.whitescale = this.item.whitescale;
            this.itemModal.url = this.item.url;

            this.$modal.show(this.modalName);
        },

        submitItemModal () {
            this.item.title = this.itemModal.title;
            this.item.icon = this.itemModal.icon;
            this.item.image = this.itemModal.image;
            this.item.whitescale = this.itemModal.whitescale;
            this.item.url = this.itemModal.url;

            this.closeItemModal();
        },

        removeItem () {
            if (confirm('Delete item?')) {
                this.$emit('remove-item');
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

            this.$modal.hide(this.modalName);
        },
    },
};
</script>
