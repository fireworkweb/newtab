<template>
    <div>
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
                    @click="openSectionModal(sectionKey)"
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
                    :items="section.items"
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
                    class="newtab__item"
                    v-for="(item, itemKey) in section.items"
                    :item="item"
                    :itemKey="itemKey"
                    :sectionKey="sectionKey"
                    :key="itemKey"
                ></newtab-item-link>
            </draggable>
        </div>
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
    }),

    methods: {
        openSectionModal (sectionKey) {
            this.sectionModal.modalName = sectionKey !== undefined ? 'Edit Section' : 'Add Section';
            this.sectionModal.sectionKey = sectionKey;

            if (sectionKey !== undefined) {
                let section = this.sections[sectionKey];

                this.sectionModal.title = section.title;
            }

            this.$modal.show('sectionModal');
        },

        submitSectionModal () {
            let key = this.sectionModal.sectionKey;

            if (key !== undefined) {
                this.sections[key].title = this.sectionModal.title;
            } else {
                this.sections.push({
                    title: this.sectionModal.title,
                    items: [],
                });
            }

            this.closeSectionModal();
        },

        removeSection (sectionKey) {
            if (confirm('Delete section?')) {
                this.sections.splice(sectionKey, 1);
            }
        },

        closeSectionModal () {
            this.sectionModal.sectionKey = null;
            this.sectionModal.title = '';

            this.$modal.hide('sectionModal');
        },

        // ----------------------------Item link ----------------------------------
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
        // ----------------------------Fim Item link ----------------------------------
    },
};
</script>
