<template>
    <div class="newtab__section">
        <div class="newtab__section_header">
            <h2 class="newtab__subtitle" v-text="section.title"></h2>

            <ul class="newtab__buttons" v-if="! lock">
                <li>
                    <button
                        class="newtab__button"
                        title="Delete Section"
                        @click="removeSection(sectionKey)"
                    >
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </li>

                <li>
                    <button
                        class="newtab__button"
                        title="Edit Section"
                        @click="openSectionModal()"
                    >
                        <i class="fas fa-edit"></i>
                    </button>
                </li>

                <li>
                    <button
                        class="newtab__button"
                        @click="openItemModal(sectionKey)"
                    >
                        <i class="fas fa-plus"></i>
                        Add Item
                    </button>
                </li>
            </ul>
        </div>

        <div
            v-if="section.type === 'birthday'"
            class="newtab__section_body"
        >
            <draggable :list="section.items" :options="draggableOptions">
                <item-birthday
                    :items.sync="section.items"
                    :section-key="sectionKey"
                    :lock="lock"
                    @remove-item="removeItem($event)"
                ></item-birthday>
            </draggable>
        </div>

        <div
            v-if="section.type === 'link'"
            class="newtab__section_body"
        >
            <draggable :list="section.items" :options="draggableOptions">
                <item-link
                    v-for="(item, itemKey) in section.items"
                    :key="itemKey"
                    :item.sync="item"
                    :section-key="sectionKey"
                    :item-key="itemKey"
                    :lock="lock"
                    @remove-item="removeItem(itemKey)"
                    class="newtab__section-item"
                ></item-link>
            </draggable>
        </div>

        <modal
            :name="sectionNameModal"
            :width="435"
            :height="215"
        >
            <div class="newtab__modal">
                <div class="newtab__modal_header">
                    <h1 class="newtab__modal_title" v-text="sectionModal.modalName"></h1>

                    <button class="newtab__modal_close" @click="closeSectionModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="newtab__modal_field">
                    <input
                        class="newtab__modal_input"
                        type="text"
                        placeholder="Title"
                        v-model="sectionModal.title"
                    >
                </div>

                <div class="newtab__modal_footer">
                    <button
                        class="newtab__modal_button"
                        @click="submitSectionModal()"
                        v-text="sectionModal.modalName"
                    ></button>
                </div>
            </div>
        </modal>

        <modal
            :name="itemNameModal"
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
                    <icon-select v-model="itemModal.icon"></icon-select>
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
import draggable from 'vuedraggable';

export default {
    components: { draggable },

    props: {
        section: {
            type: Object,
            required: true,
        },

        sectionKey: {
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

        sectionModal: {
            modalName: '',
            title: '',
        },
    }),

    computed: {
        sectionNameModal () {
            return 'sectionNameModal' + this.sectionKey;
        },

        itemNameModal () {
            return 'itemNameModal' + this.sectionKey;
        },

        draggableOptions () {
            return {
                disabled: this.lock,
            };
        },
    },

    methods: {
        openSectionModal () {
            this.sectionModal.modalName = 'Edit Section';
            this.sectionModal.title = this.section.title;

            this.$modal.show(this.sectionNameModal);
        },

        submitSectionModal () {
            this.section.title = this.sectionModal.title;

            this.closeSectionModal();
        },

        removeSection () {
            if (confirm('Delete section?')) {
                this.$emit('remove-section');
            }
        },

        closeSectionModal () {
            this.sectionModal.title = '';

            this.$modal.hide(this.sectionNameModal);
        },

        openItemModal () {
            this.itemModal.modalName = 'Add Item';

            this.$modal.show(this.itemNameModal);
        },

        submitItemModal () {
            let item = {
                title: this.itemModal.title,
                icon: this.itemModal.icon,
                image: this.itemModal.image,
                whitescale: this.itemModal.whitescale,
                url: this.itemModal.url,
            };

            this.section.items.push(item);

            this.closeItemModal();
        },

        closeItemModal () {
            this.itemModal.title = '';
            this.itemModal.icon = '';
            this.itemModal.image = '';
            this.itemModal.whitescale = false;
            this.itemModal.url = '';

            this.$modal.hide(this.itemNameModal);
        },

        removeItem (itemKey) {
            this.section.items.splice(itemKey, 1);
        },
    },
};
</script>
