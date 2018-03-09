<template>
    <div :class="`app-color-${theme}`">
        <div class="font-sans font-normal text-black leading-normal bg-primary-darkest h-screen overflow-auto">
            <div class="flex justify-between p-4 pb-8">
                <h1 class="text-primary-darker">New Tab</h1>

                <div class="pt-2 text-right">
                    <select
                        class="py-2 px-4 ml-2 shadow-md text-primary-dark appearance-none bg-transparent"
                        v-model="theme"
                    >
                        <option
                            v-for="(theme, key) in themes"
                            v-text="theme"
                            :key="key"
                            :value="theme"
                        ></option>
                    </select>

                    <button
                        class="py-2 px-4 ml-2 shadow-md text-primary-dark hover:text-primary-light"
                        @click="reset()"
                    >
                        <i class="fas fa-trash"></i> Reset
                    </button>

                    <button
                        class="py-2 px-4 ml-2 shadow-md text-primary-dark hover:text-primary-light"
                        @click="importClicked()"
                    >
                        <i class="fas fa-download"></i> Import
                    </button>

                    <button
                        class="py-2 px-4 ml-2 shadow-md text-primary-dark hover:text-primary-light"
                        @click="openImportExport()"
                    >
                        <i class="fas fa-upload"></i> Export
                    </button>

                    <button
                        class="py-2 px-4 ml-2 shadow-md text-primary-dark hover:text-primary-light"
                        @click="reset()"
                    >
                        <i class="fas fa-trash"></i> Theme
                    </button>

                    <button
                        class="py-2 px-4 ml-2 shadow-md text-primary-dark hover:text-primary-light"
                        title="Add section"
                        @click="openSectionModel()"
                    >
                        <i class="fas fa-plus"></i> Add Section
                    </button>
                </div>
            </div>

            <div
                v-for="(section, sectionKey) in sections"
                :key="sectionKey"
                class="p-4 pb-4"
            >
                <div class="flex justify-between">
                    <h2 class="text-primary-dark">{{ section.title }}</h2>

                    <div>
                        <button
                            class="py-2 px-4 shadow-md text-primary-dark hover:text-primary-light"
                            title="Edit Section"
                            @click="openSectionModel(sectionKey)"
                        >
                            <i class="fas fa-edit"></i>
                        </button>

                        <button
                            class="py-2 px-4 shadow-md text-primary-dark hover:text-primary-light"
                            title="Delete Section"
                            @click="removeSectionModel(sectionKey)"
                        >
                            <i class="fas fa-trash-alt"></i>
                        </button>

                        <button
                            class="py-2 px-4 shadow-md text-primary-dark hover:text-primary-light"
                            @click="openItemModel(sectionKey)"
                        >
                            <i class="fas fa-plus"></i> Add Item
                        </button>
                    </div>
                </div>

                <div class="flex flex-wrap -mx-2 py-2">
                    <div
                        class="w-64 p-2 relative group opacity-50 hover:opacity-100"
                        v-for="(item, itemKey) in section.items"
                        :key="itemKey"
                    >
                        <button
                            class="absolute p-1 opacity-25 hover:opacity-100 text-grey-darker"
                            style="top: 1.25rem; right: 3.75rem;"
                            @click="openItemModel(sectionKey, itemKey)"
                        >
                            <i class="fas fa-edit"></i>
                        </button>

                        <button
                            class="absolute p-1 opacity-25 hover:opacity-100 text-grey-darker"
                            style="top: 1.25rem; right: 2.5rem;"
                            @click="removeItemModel(sectionKey, itemKey)"
                        >
                            <i class="fas fa-trash-alt"></i>
                        </button>

                        <button
                            class="absolute p-1 opacity-25 hover:opacity-100 text-grey-darker"
                            style="top: 1.25rem; right: 1.25rem;"
                            @click="openItemModel(sectionKey, itemKey)"
                        >
                            <i class="fas fa-cog"></i>
                        </button>

                        <a
                            class="
                                block p-2 shadow-md text-center text-xl no-underline
                                bg-primary-darker group-hover:bg-primary-dark
                                text-primary-lightest group-hover:text-white group-hover:underline
                            "
                            :href="item.url"
                        >
                            <span
                                v-if="item.image"
                                class="block h-32 mb-1 bg-primary"
                            >
                                <img :src="item.image">
                            </span>
                            <span
                                v-if="item.icon"
                                class="block h-32 mb-1 bg-primary py-3"
                            >
                                <i :class="`fa-5x ${item.icon}`"></i>
                            </span>
                            <span
                                v-if="item.title"
                                v-text="item.title"
                            ></span>
                        </a>
                    </div>
                </div>
            </div>

            <modal
                name="itemModal"
                :width="435"
                :height="380"
            >
                <div class="p-6">
                    <div class="flex justify-between mb-6">
                        <h1 class="text-2xl text-primary">Add Item</h1>

                        <button
                            class="text-primary-lighter"
                            @click="closeItemModal()"
                        >
                            <span><i class="fas fa-times"></i></span>
                        </button>
                    </div>

                    <form class="">
                        <div class="border-b border-b-2 border-primary py-2 mt-3">
                            <input
                                class="appearance-none bg-transparent border-none w-full text-grey-darker py-1 px-2"
                                type="text"
                                placeholder="Title"
                                v-model="itemModal.title"
                            >
                        </div>

                        <div class="border-b border-b-2 border-primary py-2 mt-3">
                            <input
                                class="appearance-none bg-transparent border-none w-full text-grey-darker py-1 px-2"
                                type="text"
                                placeholder="Icon"
                                v-model="itemModal.icon"
                            >
                        </div>

                        <div class="border-b border-b-2 border-primary py-2 mt-3">
                            <input
                                class="appearance-none bg-transparent border-none w-full text-grey-darker py-1 px-2"
                                type="text"
                                placeholder="Image"
                                v-model="itemModal.image"
                            >
                        </div>

                        <div class="border-b border-b-2 border-primary py-2 mt-3">
                            <input
                                class="appearance-none bg-transparent border-none w-full text-grey-darker py-1 px-2"
                                type="text"
                                placeholder="URL"
                                v-model="itemModal.url"
                            >
                        </div>

                        <div class="text-right mt-6">
                            <button
                                class="
                                    bg-primary hover:bg-primary-light
                                    text-white font-bold py-2 px-4 rounded
                                    border-b-4 border-primary-dark hover:border-primary
                                "
                                @click.prevent="submitItemModal(itemModal.sectionKey, itemModal.itemKey)"
                            >
                                Add Item
                            </button>
                        </div>
                    </form>
                </div>
            </modal>

            <modal
                name="sectionModal"
                :width="435"
                :height="215"
            >
                <div class="p-6">
                    <div class="flex justify-between mb-6">
                        <h1 class="text-2xl text-primary">Add Section</h1>

                        <button
                            class="text-primary-lighter"
                            @click="closeSectionModal()"
                        >
                            <span><i class="fas fa-times"></i></span>
                        </button>
                    </div>

                    <form class="">
                        <div class="border-b border-b-2 border-primary py-2 mt-3">
                            <input
                                class="appearance-none bg-transparent border-none w-full text-grey-darker py-1 px-2"
                                type="text"
                                placeholder="Title"
                                v-model="sectionModal.title"
                            >
                        </div>

                        <div class="text-right mt-6">
                            <button
                                class="
                                    bg-primary hover:bg-primary-light
                                    text-white font-bold py-2 px-4 rounded
                                    border-b-4 border-primary-dark hover:border-primary
                                "
                                @click.prevent="submitSectionModal(sectionModal.sectionKey)"
                            >
                                Add Section
                            </button>
                        </div>
                    </form>
                </div>
            </modal>

            <modal
                name="transferInfos"
                :width="435"
                :height="380"
            >
                <div class="p-6">
                    <div class="flex justify-between mb-6">
                        <h1 class="text-2xl text-primary" v-text="tranferTitle"></h1>

                        <button
                            class="text-primary-lighter"
                            @click="closeImportExport()"
                        >
                            <span><i class="fas fa-times"></i></span>
                        </button>
                    </div>

                    <form class="">
                        <div class="border-b border-b-2 border-primary py-2 mt-3">
                            <textarea
                                class="appearance-none bg-transparent border-none w-full text-grey-darker py-1 px-2"
                                rows="9"
                                v-model="transferModal.data"
                            >
                            </textarea>
                        </div>

                        <div class="text-right mt-6" v-if="isImport">
                            <button
                                class="
                                    bg-primary hover:bg-primary-light
                                    text-white font-bold py-2 px-4 rounded
                                    border-b-4 border-primary-dark hover:border-primary
                                "
                                @click.prevent="submitImportExport(transferModal.data)"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </modal>
        </div>
    </div>
</template>

<script>
import SaveState from 'vue-save-state';

export default {
    mixins: [ SaveState ],

    data: () => ({
        itemModal: {
            sectionKey: null,
            itemKey: null,
            title: '',
            icon: '',
            image: '',
            url: '',
        },

        sectionModal: {
            sectionKey: null,
            title: '',
        },

        transferModal: {
            data: '',
        },

        isImport: false,
        tranferTitle: '',

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
        openItemModel(sectionKey, itemKey) {
            this.$modal.show('itemModal');

            this.itemModal.sectionKey = sectionKey;
            this.itemModal.itemKey = itemKey;

            if (itemKey !== undefined) {
                let item = this.sections[this.itemModal.sectionKey].items[itemKey];

                this.itemModal.title = item.title;
                this.itemModal.icon = item.icon;
                this.itemModal.image = item.image;
                this.itemModal.url = item.url;
            }
        },

        submitItemModal(sectionKey, itemKey) {
            if (itemKey !== undefined) {
                this.sections[sectionKey].items[itemKey].title = this.itemModal.title;
                this.sections[sectionKey].items[itemKey].icon = this.itemModal.icon;
                this.sections[sectionKey].items[itemKey].image = this.itemModal.image;
                this.sections[sectionKey].items[itemKey].url = this.itemModal.url;
            } else {
                this.sections[this.itemModal.sectionKey].items.push({
                    title: this.itemModal.title,
                    icon: this.itemModal.icon,
                    image: this.itemModal.image,
                    url: this.itemModal.url,
                });
            }

            this.closeItemModal();
        },

        removeItemModel(sectionKey, itemKey) {
            this.sections[sectionKey].items.splice(itemKey, 1);
        },

        closeItemModal() {
            this.$modal.hide('itemModal');

            this.itemModal.sectionKey = null;
            this.itemModal.itemKey = null;
            this.itemModal.title = '';
            this.itemModal.icon = '';
            this.itemModal.image = '';
            this.itemModal.url = '';
        },

        openSectionModel(sectionKey) {
            this.$modal.show('sectionModal');

            this.sectionModal.sectionKey = sectionKey;

            if (sectionKey !== undefined) {
                let section = this.sections[sectionKey];

                this.sectionModal.title = section.title;
            }
        },

        submitSectionModal(sectionKey) {
            if (sectionKey !== undefined) {
                this.sections[sectionKey].title = this.sectionModal.title;
            } else {
                this.sections.push({
                    title: this.sectionModal.title,
                    items: [],
                });
            }

            this.closeSectionModal();
        },

        removeSectionModel(sectionKey) {
            this.sections.splice(sectionKey, 1);
        },

        closeSectionModal() {
            this.$modal.hide('sectionModal');

            this.sectionModal.sectionKey = null;
            this.sectionModal.title = '';
        },

        importClicked () {
            this.isImport = true;
            this.openImportExport();
        },

        openImportExport () {
            this.$modal.show('transferInfos');

            this.tranferTitle = this.isImport ? 'Import' : 'Export';
            let local = window.localStorage;

            let storage = JSON.stringify(local.App).replace(/\\/g, "");

            if(! this.isImport) {
                this.transferModal.data = storage;
            }
        },

        submitImportExport (newStorage) {
            this.validateText(JSON.parse(newStorage));

            this.closeImportExport();
        },

        closeImportExport () {
            this.$modal.hide('transferInfos');
            this.isImport = false;
            this.transferModal.data = '';
        },

        reset () {
            this.clearSavedState();

            location.reload();
        },

        getSaveStateConfig() {
            return {
                'cacheKey': 'App',
                'saveProperties': ['theme', 'sections'],
            };
        },

        validateText(importText) {
            if (! importText.theme) {
                return;
            }

            if(this.themes.indexOf(importText.theme) === -1) {
                return;
            }

            if(! importText.sections) {
                return;
            }

            let sectionsToImport = [];

            importText.sections.forEach(section => {
                if(! section.title) {
                    return;
                }

                let itemsToImport = [];
                section.items.forEach((item) => {
                    if (! item.title && !item.url) {
                        return;
                    }

                    itemsToImport.push({
                       title: item.title,
                       icon: item.icon || '',
                       image: item.image || '',
                       url: item.url,
                   });
                });

                sectionsToImport.push({
                    title: section.title,
                    items: itemsToImport,
                });
            });

            this.sections = sectionsToImport;
            this.theme = importText.theme;
        },
    },
};
</script>

<style lang="scss">
@tailwind preflight;
@tailwind utilities;

$colors: (
    'grey', 'red', 'orange', 'yellow', 'green',
    'teal', 'blue', 'indigo', 'purple', 'pink',
);

$tons: (
    'darkest', 'darker', 'dark',
    'light', 'lighter', 'lightest',
);

@each $color in $colors {
    .app-color-#{$color} {
        .bg-primary { @apply .bg-#{$color} }
        .border-primary { @apply .border-#{$color} }
        .text-primary { @apply .text-#{$color} }

        @each $ton in $tons {
            .bg-primary-#{$ton} { @apply .bg-#{$color}-#{$ton} }
            .border-primary-#{$ton} { @apply .border-#{$color}-#{$ton} }
            .text-primary-#{$ton} { @apply .text-#{$color}-#{$ton} }
        }
    }
}
</style>
