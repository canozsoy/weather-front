<template>
    <div>
        City: {{weather.name}}
        Temp: {{weather.weather}} &#176;C
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'WeatherComponent',
    data() {
        return {
            weather: '',
        };
    },
    created() {
        this.fetchData();
    },
    watch: {
        $route() {
            this.fetchData();
        },
    },
    methods: {
        ...mapActions(['fetchWeather']),
        async fetchData() {
            const { params } = this.$route;
            this.weather = await this.fetchWeather(params);
            console.log(this.weather);
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
