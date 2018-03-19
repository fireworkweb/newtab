<template>
    <div>
        <div class="newtab__item">
            <button
                class="newtab__item_button newtab__item_button--third"
                title="See all"
                @click="openSeeAllBirthdays(sectionKey)"
            >
                <i class="fas fa-eye"></i>
            </button>

            <button
                class="newtab__item_button newtab__item_button--second"
                title="Import birthdays"
                @click="openImportBirthdayModal(sectionKey)"
            >
                <i class="fas fa-download"></i>
            </button>

            <button
                class="newtab__item_button newtab__item_button--first"
                title="Add new birthday"
                @click="openAddBirthdayModal(sectionKey)"
            >
                <i class="fas fa-plus"></i>
            </button>

            <a
                class="newtab__item_body newtab__item_body--birthday"
                @click="openBirthdaysMonthModal(sectionKey)"
            >
                <span
                    v-if="getMonth(items).length > 0"
                    class="newtab__item_text"
                >
                    <p
                        v-for="(item, itemKey) in getMonth(items)"
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
                    v-if="getToday(items).length > 0"
                    class="newtab__item_text"
                >
                    <p
                        v-for="(item, itemKey) in getToday(items)"
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
    </div>
</template>

<script>
import moment from 'moment';

export default {
    props: {
        items: {
            type: Array,
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

    }),

    methods: {
        getMonth (birthdays) {
            return birthdays.filter(birthday =>
                Number(birthday.date.split('-')[1]) === moment().month() + 1,
            );
        },

        getToday (birthdays) {
            return birthdays.filter(birthday =>
                Number(birthday.date.split('-')[0]) === moment().date() && Number(birthday.date.split('-')[1]) === moment().month() + 1,
            );
        },

        // removePerson (personKey) {
        //     if (confirm('Delete person?')) {
        //         this.sections[this.birthdayModal.sectionKey].items.splice(personKey, 1);
        //     }
        // },

        // //OK
        // openSeeAllBirthdays (sectionKey) {
        //     this.allBirthdayModal = this.sections[sectionKey].items;
        //     this.birthdayModal.sectionKey = sectionKey;

        //     this.$modal.show('seeAllModal');
        // },

        // closeSeeAllBirthdays () {
        //     this.$modal.hide('seeAllModal');
        // },

        // //OK
        // openAddBirthdayModal (sectionKey) {
        //     this.birthdayModal.sectionKey = sectionKey;
        //     this.birthdayModal.modalName = 'Add new birthday';

        //     this.$modal.show('birthdayModal');
        // },

        // submitBirthdayModal () {
        //     let sectionKey = this.birthdayModal.sectionKey,
        //         section = this.sections[sectionKey],
        //         item = {
        //             name: this.birthdayModal.name,
        //             date: this.birthdayModal.date,
        //         };

        //     section.items.push(item);

        //     this.closeAddBirthdayModal();
        // },

        // openItemModal (sectionKey, itemKey) {
        //     this.itemModal.modalName = itemKey !== undefined ? 'Edit Item' : 'Add Item';

        //     this.itemModal.sectionKey = sectionKey;
        //     this.itemModal.itemKey = itemKey;

        //     this.$modal.show('itemModal');

        //     if (itemKey !== undefined) {
        //         let item = this.sections[this.itemModal.sectionKey].items[itemKey];

        //         this.itemModal.title = item.title;
        //         this.itemModal.icon = item.icon;
        //         this.itemModal.image = item.image;
        //         this.itemModal.whitescale = item.whitescale;
        //         this.itemModal.url = item.url;
        //     }
        // },

        // submitItemModal () {
        //     let itemKey = this.itemModal.itemKey,
        //         sectionKey = this.itemModal.sectionKey,
        //         section = this.sections[sectionKey],
        //         item = {
        //             title: this.itemModal.title,
        //             icon: this.itemModal.icon,
        //             image: this.itemModal.image,
        //             whitescale: this.itemModal.whitescale,
        //             url: this.itemModal.url,
        //         };

        //     if (itemKey !== undefined) {
        //         section.items[itemKey] = item;
        //     } else {
        //         section.items.push(item);
        //     }

        //     this.closeItemModal();
        // },

        // removeItem (sectionKey, itemKey) {
        //     if (confirm('Delete item?')) {
        //         this.sections[sectionKey].items.splice(itemKey, 1);
        //     }
        // },

        // closeItemModal () {
        //     this.itemModal.sectionKey = null;
        //     this.itemModal.itemKey = null;
        //     this.itemModal.title = '';
        //     this.itemModal.icon = '';
        //     this.itemModal.image = '';
        //     this.itemModal.whitescale = false;
        //     this.itemModal.url = '';

        //     this.$modal.hide('itemModal');
        // },

        // // OK
        // openSectionModal (sectionKey) {
        //     this.sectionModal.modalName = sectionKey !== undefined ? 'Edit Section' : 'Add Section';
        //     this.sectionModal.sectionKey = sectionKey;

        //     if (sectionKey !== undefined) {
        //         let section = this.sections[sectionKey];

        //         this.sectionModal.title = section.title;
        //     }

        //     this.$modal.show('sectionModal');
        // },

        // submitSectionModal () {
        //     let key = this.sectionModal.sectionKey;

        //     if (key !== undefined) {
        //         this.sections[key].title = this.sectionModal.title;
        //     } else {
        //         this.sections.push({
        //             title: this.sectionModal.title,
        //             items: [],
        //         });
        //     }

        //     this.closeSectionModal();
        // },

        // // OK
        // removeSection (sectionKey) {
        //     if (confirm('Delete section?')) {
        //         this.sections.splice(sectionKey, 1);
        //     }
        // },

        // closeSectionModal () {
        //     this.sectionModal.sectionKey = null;
        //     this.sectionModal.title = '';

        //     this.$modal.hide('sectionModal');
        // },



        // importBirthdays () {
        //     let importText = JSON.parse(this.birthdayModal.import);

        //     if (! importText.items) {
        //         return;
        //     }

        //     let section = importText
        //         .items
        //         .filter(item => item.name && item.date)
        //         .map(item => ({
        //             name: item.name,
        //             date: item.date,
        //         }));

        //     this.sections[this.birthdayModal.sectionKey].items = section;

        //     this.closeImportBirthdayModal();
        // },
    },
};
</script>
