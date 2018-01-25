<template>
    <div>
        <div
            v-for="(section, key) in sections"
            :key="key"
            class="p-4 pb-4"
        >
            <h2 class="text-primary-lightest">{{ section.name }}</h2>
            <div class="flex flex-wrap -mx-2 py-2">
                <div
                    class="w-1/5 p-2"
                    v-for="(item, key) in section.items"
                    :key="key"
                >
                    <a
                        class="
                            block p-2 shadow-md text-center text-xl no-underline
                            bg-primary-darker hover:bg-primary-dark
                            text-primary-lightest hover:text-white hover:underline
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
    </div>
</template>

<script>
export default {
    data: () => ({
        sections: [
            {
                name: 'Work',
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
                name: 'Fun',
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
    }),
}
</script>
