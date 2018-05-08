<template>
    <div :class="`app-color-${theme}`">
        <div class="newtab">
            <div class="newtab__header">
                <h1 class="newtab__title">New Tab</h1>

                <div class="newtab__buttons">
                    <template v-if="! lock">
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

                        <a class="newtab__button" href="https://github.com/fireworkweb/newtab">
                            <i class="fab fa-github"></i> Github
                        </a>

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
                    </template>

                    <button class="newtab__button" @click="toggleLock()">
                        <i
                            :class="`fas fa-lock${lock ? '' : '-open'}`"
                        ></i> {{ lock ? 'Unlock' : 'Lock' }}
                    </button>
                </div>
            </div>

            <draggable :list="sections" :options="draggableOptions">
                <newtab-section
                    v-for="(section, sectionKey) in sections"
                    :section.sync="section"
                    :section-key="sectionKey"
                    :key="sectionKey"
                    class="newtab__section"
                >
                    <div v-if="section.type === 'birthday'">
                        <div class="newtab__section_header">
                            <h2 class="newtab__subtitle" v-text="section.title"></h2>

                            <div class="newtab__buttons" v-if="! lock">
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
                                    title="Import birthdays"
                                    @click="openImportBirthdayModal(sectionKey)"
                                >
                                    <i class="fas fa-download"></i>
                                    Import birthdays
                                </button>

                                <button
                                    class="newtab__button"
                                    title="See all"
                                    @click="openSeeAllBirthdays(sectionKey)"
                                >
                                    <i class="fas fa-eye"></i>
                                    See all
                                </button>

                                <button
                                    class="newtab__button"
                                    title="Add new birthday"
                                    @click="openAddBirthdayModal(sectionKey)"
                                >
                                    <i class="fas fa-plus"></i>
                                    Add New
                                </button>
                            </div>
                        </div>

                        <div class="newtab__section_body">
                            <draggable :list="section.items" :options="draggableOptions">
                                <div class="newtab__item">
                                    <a
                                        class="newtab__item_body newtab__item_body--birthday"
                                        @click="openBirthdaysMonthModal(sectionKey)"
                                    >
                                        <span
                                            v-if="getMonth(section.items).length > 0"
                                            class="newtab__item_text"
                                        >
                                            <p
                                                v-for="(item, itemKey) in getMonth(section.items)"
                                                :key="itemKey"
                                                v-text="item.name"
                                            ></p>
                                        </span>

                                        <span v-else class="newtab__item_icon">
                                            <p>No</p>
                                            <i class="fa-2x fas fa-birthday-cake"></i>
                                            <p>this month</p>
                                        </span>

                                        <span v-text="'Month'"></span>
                                    </a>
                                </div>

                                <div class="newtab__item">
                                    <div class="newtab__item_body">
                                        <span
                                            v-if="getToday(section.items).length > 0"
                                            class="newtab__item_text"
                                        >
                                            <p
                                                v-for="(item, itemKey) in getToday(section.items)"
                                                :key="itemKey"
                                                v-text="item.name"
                                            ></p>
                                        </span>

                                        <span v-else class="newtab__item_icon">
                                            <p>No</p>
                                            <i class="fa-2x fas fa-birthday-cake"></i>
                                            <p>today</p>
                                        </span>

                                        <span v-text="'Today'"></span>
                                    </div>
                                </div>
                            </draggable>
                        </div>
                    </div>

                    <div v-if="section.type === 'link'">
                        <div class="newtab__section_header">
                            <h2 class="newtab__subtitle" v-text="section.title"></h2>

                            <div class="newtab__buttons" v-if="! lock">
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

                        <div class="newtab__section_body">
                            <draggable :list="section.items" :options="draggableOptions">
                                <div
                                    class="newtab__item"
                                    v-for="(item, itemKey) in section.items"
                                    :key="itemKey"
                                >
                                    <template v-if="! lock">
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
                                    </template>

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
                            </draggable>
                        </div>
                    </div>
                </newtab-section>
            </draggable>

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
                            placeholder="Insert your json here"
                            rows="9"
                            v-model="importModal.data"
                        ></textarea>
                    </div>

                    <div class="newtab__modal_footer">
                        <button
                            class="newtab__modal_button"
                            @click="importJson()"
                            v-text="'Save'"
                        ></button>
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
                            readonly
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
import moment from 'moment';

export default {
    components: { draggable },
    mixins: [ SaveState ],

    data: () => ({
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
                title: 'Birthdays',
                type: 'birthday',
                items: [
                    {
                        name: 'John Doe',
                        date: '01-01',
                    },
                    {
                        name: 'Jane Doe',
                        date: '03-03',
                    },
                ],
            },
            {
                title: 'Work',
                type: 'link',
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
                type: 'link',
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

        lock: false,
    }),

    computed: {
        draggableOptions () {
            return {
                disabled: this.lock,
            };
        },
    },

    methods: {
        // ---------------------------- Section ----------------------------------
        openSectionModal (sectionKey) {
            this.sectionModal.modalName = 'Add Section';
            this.sectionModal.sectionKey = sectionKey;

            this.$modal.show('sectionModal');
        },

        submitSectionModal () {
            this.sections.push({
                title: this.sectionModal.title,
                type: 'link',
                items: [],
            });

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
        // ---------------------------- Fim Section ----------------------------------

        // ----------------------------Import / Export ----------------------------------
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
                            whitescale: item.whitescale || false,
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
        // ----------------------------Fim Import / Export ----------------------------------

        reset () {
            if (confirm('Reset all configurations?')) {
                this.clearSavedState();
                location.reload();
            }
        },

        getSaveStateConfig () {
            return {
                'cacheKey': 'App',
                'saveProperties': ['theme', 'sections', 'lock'],
            };
        },

        toggleLock () {
            this.lock = ! this.lock;
        },
    },
};
</script>
