<template>
    <div class="newtab__section">
        <div class="newtab__section_header">
            <h2 class="newtab__subtitle" v-text="section.title"></h2>

            <div class="newtab__buttons">
                <button
                    class="newtab__button"
                    title="Delete Section"
                    @click="removeSection(sectionKey)"
                >
                    <i class="fas fa-trash-alt"></i>
                </button>

                <button
                    class="newtab__button"
                    title="Edit Section"
                    @click="openSectionModal()"
                >
                    <i class="fas fa-edit"></i>
                </button>

                <button
                    class="newtab__button"
                    @click="openItemModal(sectionKey)"
                >
                    <i class="fas fa-plus"></i>
                    Add Item
                </button>
            </div>
        </div>

        <div
            v-if="section.type === 'birthday'"
            class="newtab__section_body"
        >
            <draggable :list="section.items">
                 <newtab-item-birthday
                    :items.sync="section.items"
                    :sectionKey="sectionKey"
                ></newtab-item-birthday>
            </draggable>
        </div>

        <div
            v-if="section.type === 'link'"
            class="newtab__section_body"
        >
            <draggable :list="section.items">
                <newtab-item-link
                    v-for="(item, itemKey) in section.items"
                    :item.sync="item"
                    :key="itemKey"
                    :sectionKey="sectionKey"
                    :itemKey="itemKey"
                ></newtab-item-link>
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
import moment from 'moment';
import draggable from 'vuedraggable';

export default {
    components: { draggable },

    props: {
        section: {
            type: Object,
        },
        sectionKey: {
            type: Number,
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

        removeSection (sectionKey) {
            if (confirm('Delete section?')) {
                this.sections.splice(sectionKey, 1);
            }
        },

        closeSectionModal () {
            this.sectionModal.title = '';

            this.$modal.hide(this.sectionNameModal);
        },

        // ----------------------------Item link ----------------------------------
         openItemModal (sectionKey) {
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
        // ----------------------------Fim Item link ----------------------------------
    },
};
</script>
