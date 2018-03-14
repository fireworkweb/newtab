<template>
    <div :class="`app-color-${theme}`">
        <div class="newtab">
            <div class="newtab__header">
                <h1 class="newtab__title">New Tab</h1>

                <div class="newtab__buttons">
                    <div class="newtab__select">
                        <select v-model="theme">
                            <option
                                v-for="(theme, key) in themes"
                                v-text="theme"
                                :key="key"
                                :value="theme"
                            ></option>
                        </select>
                        <i class="fas fa-sort-down"></i>
                    </div>

                    <button class="newtab__button" @click="reset()">
                        <i class="fas fa-trash"></i> Reset
                    </button>

                    <button class="newtab__button" @click="openImport()">
                        <i class="fas fa-download"></i> Import
                    </button>

                    <button class="newtab__button" @click="openExport()">
                        <i class="fas fa-upload"></i> Export
                    </button>

                    <button class="newtab__button" @click="openSectionModal()">
                        <i class="fas fa-plus"></i> Add Section
                    </button>
                </div>
            </div>

            <draggable :list="sections">
                <div
                    v-for="(section, sectionKey) in sections"
                    :key="sectionKey"
                    class="newtab__section"
                >
                    <div class="newtab__section_header">
                        <h2 class="newtab__subtitle">{{ section.title }}</h2>

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
                                v-text="'Add Item'"
                            >
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>

                    <div class="newtab__section_body">
                        <draggable :list="section.items">
                            <div
                                class="newtab__item"
                                v-for="(item, itemKey) in section.items"
                                :key="itemKey"
                            >
                                <button
                                    class="newtab__item_button newtab__item_button--delete"
                                    @click="removeItem(sectionKey, itemKey)"
                                >
                                    <i class="fas fa-trash-alt"></i>
                                </button>

                                <button
                                    class="newtab__item_button newtab__item_button--edit"
                                    @click="openItemModal(sectionKey, itemKey)"
                                >
                                    <i class="fas fa-edit"></i>
                                </button>

                                <a class="newtab__item_body" :href="item.url">
                                    <span v-if="item.image" class="newtab__item_image">
                                        <img :src="item.image">
                                    </span>

                                    <span v-if="item.icon" class="newtab__item_icon">
                                        <i class="fa-5x" :class="item.icon"></i>
                                    </span>

                                    <span v-if="item.title" v-text="item.title"></span>
                                </a>
                            </div>
                        </draggable>
                    </div>
                </div>
            </draggable>

            <modal
                name="itemModal"
                :width="435"
                :height="380"
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

            <modal
                name="sectionModal"
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
                name="importModal"
                :width="435"
                :height="380"
            >
                <div class="newtab__modal">
                    <div class="newtab__modal_header">
                        <h1 class="newtab__modal_title" v-text="'Import'"></h1>

                        <button class="newtab__modal_close" @click="closeImport()">
                            <span><i class="fas fa-times"></i></span>
                        </button>
                    </div>

                    <div class="newtab__modal_field">
                        <textarea
                            class="newtab__modal_input"
                            rows="9"
                            v-model="importModal.data"
                        ></textarea>
                    </div>

                    <div class="newtab__modal_footer">
                        <button
                            class="newtab__modal_button"
                            @click="importJson()"
                            v-text="'Save'"
                        >
                        </button>
                    </div>
                </div>
            </modal>

            <modal
                name="exportModal"
                :width="435"
                :height="380"
            >
                <div class="newtab__modal">
                    <div class="newtab__modal_header">
                        <h1 class="newtab__modal_title" v-text="'Export'"></h1>

                        <button class="newtab__modal_close" @click="closeExport()">
                            <span><i class="fas fa-times"></i></span>
                        </button>
                    </div>

                    <div class="newtab__modal_field">
                        <textarea
                            ref="export"
                            class="newtab__modal_input"
                            rows="9"
                            v-model="exportModal.data"
                        ></textarea>
                    </div>

                    <div class="newtab__modal_footer">
                        <button
                            class="newtab__modal_button"
                            @click="copyToClipboard()"
                            v-text="'Copy to clipboard'"
                        ></button>
                    </div>
                </div>
            </modal>
        </div>
    </div>
</template>

<script>
import SaveState from 'vue-save-state';
import draggable from 'vuedraggable';

export default {
    components: { draggable },
    mixins: [ SaveState ],

    data: () => ({
        itemModal: {
            sectionKey: null,
            itemKey: null,
            modalName: '',
            title: '',
            icon: '',
            image: '',
            url: '',
        },

        sectionModal: {
            sectionKey: null,
            modalName: '',
            title: '',
        },

        importModal: {
            data: '',
        },

        exportModal: {
            data: '',
        },

        sections: [
            {
                title: 'Work',
                items: [
                    {
                        url: 'https://calendar.google.com/calendar/r',
                        icon: 'far fa-calendar-alt',
                        title: 'Calendar',
                    },
                    {
                        url: '#',
                        image: 'http://via.placeholder.com/224x128',
                        title: 'Test',
                    },
                    {
                        url: '#',
                        image: 'http://via.placeholder.com/224x128',
                        title: 'Test',
                    },
                    {
                        url: '#',
                        image: 'http://via.placeholder.com/224x128',
                        title: 'Test',
                    },
                    {
                        url: '#',
                        image: 'http://via.placeholder.com/224x128',
                        title: 'Test',
                    },
                    {
                        url: '#',
                        image: 'http://via.placeholder.com/224x128',
                        title: 'Test',
                    },
                    {
                        url: '#',
                        image: 'http://via.placeholder.com/224x128',
                        title: 'Test',
                    },
                ],
            },
            {
                title: 'Fun',
                items: [
                    {
                        url: 'https://calendar.google.com/calendar/r',
                        icon: 'far fa-calendar-alt',
                        title: 'Calendar',
                    },
                    {
                        url: '#',
                        image: 'http://via.placeholder.com/224x128',
                        title: 'Test',
                    },
                    {
                        url: '#',
                        image: 'http://via.placeholder.com/224x128',
                        title: 'Test',
                    },
                    {
                        url: '#',
                        image: 'http://via.placeholder.com/224x128',
                        title: 'Test',
                    },
                    {
                        url: '#',
                        image: 'http://via.placeholder.com/224x128',
                        title: 'Test',
                    },
                ],
            },
        ],

        themes: [
            'grey', 'red', 'orange', 'yellow', 'green',
            'teal', 'blue', 'indigo', 'purple', 'pink',
        ],

        theme: 'purple',
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
            this.itemModal.url = '';

            this.$modal.hide('itemModal');
        },

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

        openImport () {
            this.$modal.show('importModal');
        },

        openExport () {
            let storage = {
                sections: this.sections,
                theme: this.theme,
            };

            this.exportModal.data = JSON.stringify(storage);

            this.$modal.show('exportModal');
        },

        importJson () {
            let importText = JSON.parse(this.importModal.data);

            if (this.themes.indexOf(importText.theme) !== -1) {
                this.theme = importText.theme;
            }

            if (! importText.sections) {
                return;
            }

            let sections = importText
                .sections
                .filter(section => !! section.title)
                .map(section => {
                    section.items = section
                        .items
                        .filter(item => item.title && item.url)
                        .map(item => ({
                            title: item.title,
                            icon: item.icon || '',
                            image: item.image || '',
                            url: item.url,
                        }));
                    return section;
                });

            this.sections = sections;

            this.closeImport();
        },

        closeImport () {
            this.importModal.data = '';
            this.$modal.hide('importModal');
        },

        closeExport () {
            this.exportModal.data = '';
            this.$modal.hide('exportModal');
        },

        copyToClipboard () {
            this.$refs.export.select();
            document.execCommand('Copy');

            this.closeExport();
        },

        reset () {
            if (confirm('Reset all configurations?')) {
                this.clearSavedState();
                location.reload();
            }
        },

        getSaveStateConfig () {
            return {
                'cacheKey': 'App',
                'saveProperties': ['theme', 'sections'],
            };
        },
    },
};
</script>
