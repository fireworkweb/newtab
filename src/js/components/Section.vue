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
    }),
};
</script>
