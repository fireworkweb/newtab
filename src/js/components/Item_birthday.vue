<template>
    <div>
        <div class="newtab__item">
            <button
                class="newtab__item_button newtab__item_button--third"
                title="See all"
                @click="openSeeAllBirthdays()"
            >
                <i class="fas fa-eye"></i>
            </button>

            <button
                class="newtab__item_button newtab__item_button--second"
                title="Import birthdays"
                @click="openImportBirthdayModal()"
            >
                <i class="fas fa-download"></i>
            </button>

            <button
                class="newtab__item_button newtab__item_button--first"
                title="Add new birthday"
                @click="openAddBirthdayModal()"
            >
                <i class="fas fa-plus"></i>
            </button>

            <a
                class="newtab__item_body newtab__item_body--birthday"
                @click="openBirthdaysMonthModal()"
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

        <modal
            name="birthdayMonthModal"
            :width="435"
            :height="400"
        >
            <div class="newtab__modal">
                <div class="newtab__modal_header">
                    <h1 class="newtab__modal_title" v-text="'Birthdays of the Month'"></h1>

                    <button class="newtab__modal_close" @click="closeBirthdaysMonthModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="newtab__modal_body">
                    <div
                        v-for="(person, personKey) in birthdayMonthModal"
                        :key="personKey"
                        class="newtab__modal_field"
                        v-text="person.name + ' - ' + person.date"
                    ></div>
                </div>
            </div>
        </modal>

        <modal
            name="seeAllModal"
            :width="435"
            :height="400"
        >
            <div class="newtab__modal">
                <div class="newtab__modal_header">
                    <h1 class="newtab__modal_title" v-text="'See all'"></h1>

                    <button class="newtab__modal_close" @click="closeSeeAllBirthdays()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="newtab__modal_body">
                    <div
                        v-for="(person, personKey) in items"
                        :key="personKey"
                        class="newtab__modal_field newtab__modal_field--modal"
                    >
                        {{ person.name + ' - ' + person.date }}

                        <button
                            class="newtab__button newtab__button--modal"
                            title="Delete Person"
                            @click="removePerson(personKey)"
                        >
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </modal>

        <modal
            name="birthdayModal"
            :width="435"
            :height="280"
        >
            <div class="newtab__modal">
                <div class="newtab__modal_header">
                    <h1 class="newtab__modal_title" v-text="birthdayModal.modalName"></h1>

                    <button class="newtab__modal_close" @click="closeAddBirthdayModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="newtab__modal_field">
                    <input
                        class="newtab__modal_input"
                        type="text"
                        placeholder="Name"
                        v-model="birthdayModal.name"
                    >
                </div>

                <div class="newtab__modal_field">
                    <input
                        class="newtab__modal_input"
                        type="text"
                        placeholder="Date (01-01)"
                        v-model="birthdayModal.date"
                    >
                </div>

                <div class="newtab__modal_footer">
                    <button
                        class="newtab__modal_button"
                        @click="submitBirthdayModal()"
                        v-text="birthdayModal.modalName"
                    ></button>
                </div>
            </div>
        </modal>

        <modal
            name="importBirthdaysModal"
            :width="435"
            :height="380"
        >
            <div class="newtab__modal">
                <div class="newtab__modal_header">
                    <h1 class="newtab__modal_title" v-text="'Import'"></h1>

                    <button class="newtab__modal_close" @click="closeImportBirthdayModal()">
                        <span><i class="fas fa-times"></i></span>
                    </button>
                </div>

                <div class="newtab__modal_field">
                    <textarea
                        class="newtab__modal_input"
                        rows="9"
                        placeholder="Paste birthday json"
                        v-model="birthdayModal.import"
                    ></textarea>
                </div>

                <div class="newtab__modal_footer">
                    <button
                        class="newtab__modal_button"
                        @click="importBirthdays()"
                        v-text="'Save'"
                    >
                    </button>
                </div>
            </div>
        </modal>
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
        birthdayModal: {
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

        removePerson (personKey) {
            if (confirm('Delete person?')) {
                this.sections[this.birthdayModal.sectionKey].items.splice(personKey, 1);
            }
        },

        openSeeAllBirthdays () {
            this.$modal.show('seeAllModal');
        },

        closeSeeAllBirthdays () {
            this.$modal.hide('seeAllModal');
        },

        openAddBirthdayModal () {
            this.birthdayModal.modalName = 'Add new birthday';

            this.$modal.show('birthdayModal');
        },

        submitBirthdayModal () {
            let item = {
                name: this.birthdayModal.name,
                date: this.birthdayModal.date,
            };

            this.items.push(item);

            this.closeAddBirthdayModal();
        },

        openImportBirthdayModal () {
            this.$modal.show('importBirthdaysModal');
        },

        closeImportBirthdayModal () {
            this.$modal.hide('importBirthdaysModal');
        },

        closeAddBirthdayModal () {
            this.$modal.hide('birthdayModal');
        },

        openBirthdaysMonthModal () {
            this.birthdayMonthModal = this.getMonth(this.items);

            this.$modal.show('birthdayMonthModal');
        },

        closeBirthdaysMonthModal () {
            this.$modal.hide('birthdayMonthModal');
        },

        importBirthdays () {
            let importText = JSON.parse(this.birthdayModal.import);

            if (! importText.items) {
                return;
            }

            this.items.splice(0);

            let section = importText
                .items
                .filter(item => item.name && item.date)
                .map((item, itemKey) =>
                    this.$set(this.items, itemKey, item)
                );

            this.closeImportBirthdayModal();
        },
    },
};
</script>
