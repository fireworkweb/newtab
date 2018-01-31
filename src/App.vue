<template>
    <div :class="`app-color-${theme}`">
        <div class="font-sans font-normal text-black leading-normal bg-primary-darkest">
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
                    >
                        <i class="fas fa-import"></i> Import
                    </button>

                    <button
                        class="py-2 px-4 ml-2 shadow-md text-primary-dark hover:text-primary-light"
                    >
                        <i class="fas fa-export"></i> Export
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
                            title="Section Settings"
                            @click="openSectionModel(sectionKey)"
                        >
                            <i class="fas fa-cog"></i>
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
                        class="w-1/5 p-2 relative group opacity-50 hover:opacity-100"
                        v-for="(item, itemKey) in section.items"
                        :key="itemKey"
                    >
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
                                <i :class="`far fa-5x fa-${item.icon}`"></i>
                            </span>
                            <span
                                v-if="item.title"
                                v-text="item.title"
                            ></span>
                        </a>
                    </div>
                </div>
            </div>

            <div
                class="fixed pin flex items-center"
                v-if="itemModal.isOpened"
            >
                <div
                    class="fixed pin bg-black opacity-75 z-10"
                    @click="closeItemModal()"
                ></div>

                <div class="relative mx-6 md:mx-auto w-full md:w-1/2 lg:w-1/3 z-20 m-8">
                    <div class="shadow-lg bg-white rounded-lg p-6">
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
                                    @click.prevent="submitItemModal()"
                                >
                                    Add Item
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div
                class="fixed pin flex items-center"
                v-if="sectionModal.isOpened"
            >
                <div
                    class="fixed pin bg-black opacity-75 z-10"
                    @click="closeSectionModal()"
                ></div>

                <div class="relative mx-6 md:mx-auto w-full md:w-1/2 lg:w-1/3 z-20 m-8">
                    <div class="shadow-lg bg-white rounded-lg p-6">
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
                                    @click.prevent="submitSectionModal()"
                                >
                                    Add Section
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SaveState from 'vue-save-state';

export default {
    mixins: [ SaveState ],

    data: () => ({
        itemModal: {
            isOpened: false,
            sectionKey: null,
            itemKey: null,
            title: '',
            icon: '',
            image: '',
            url: '',
        },

        sectionModal: {
            isOpened: false,
            sectionKey: null,
            title: '',
        },

        sections: [
            {
                title: 'Work',
                items: [
                    {
                        url: 'https://calendar.google.com/calendar/r',
                        icon: 'calendar-alt',
                        title: 'Calendar',
                    },
                    {
                        url: '#',
                        image: 'http://via.placeholder.com/300x130',
                        title: 'Test',
                    },
                    {
                        url: '#',
                        image: 'http://via.placeholder.com/300x130',
                        title: 'Test',
                    },
                    {
                        url: '#',
                        image: 'http://via.placeholder.com/300x130',
                        title: 'Test',
                    },
                    {
                        url: '#',
                        image: 'http://via.placeholder.com/300x130',
                        title: 'Test',
                    },
                    {
                        url: '#',
                        image: 'http://via.placeholder.com/300x130',
                        title: 'Test',
                    },
                    {
                        url: '#',
                        image: 'http://via.placeholder.com/300x130',
                        title: 'Test',
                    },
                ],
            },
            {
                title: 'Fun',
                items: [
                    {
                        url: 'https://calendar.google.com/calendar/r',
                        icon: 'calendar-alt',
                        title: 'Calendar',
                    },
                    {
                        url: '#',
                        image: 'http://via.placeholder.com/300x130',
                        title: 'Test',
                    },
                    {
                        url: '#',
                        image: 'http://via.placeholder.com/300x130',
                        title: 'Test',
                    },
                    {
                        url: '#',
                        image: 'http://via.placeholder.com/300x130',
                        title: 'Test',
                    },
                    {
                        url: '#',
                        image: 'http://via.placeholder.com/300x130',
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
            this.itemModal.isOpened = true;
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

        submitItemModal() {
            this.sections[this.itemModal.sectionKey].items.push({
                title: this.itemModal.title,
                icon: this.itemModal.icon,
                image: this.itemModal.image,
                url: this.itemModal.url,
            });

            this.closeItemModal();
        },

        closeItemModal() {
            this.itemModal.isOpened = false;
            this.itemModal.sectionKey = null;
            this.itemModal.itemKey = null;
            this.itemModal.title = '';
            this.itemModal.icon = '';
            this.itemModal.image = '';
            this.itemModal.url = '';
        },

        openSectionModel(sectionKey) {
            this.sectionModal.isOpened = true;
            this.sectionModal.sectionKey = sectionKey;

            if (sectionKey !== undefined) {
                let section = this.sections[sectionKey];

                this.sectionModal.title = section.title;
            }
        },

        submitSectionModal() {
            this.sections.push({
                title: this.sectionModal.title,
                items: [],
            });

            this.closeSectionModal();
        },

        closeSectionModal() {
            this.sectionModal.isOpened = false;
            this.sectionModal.sectionKey = null;
            this.sectionModal.title = '';
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
    },
};
</script>
