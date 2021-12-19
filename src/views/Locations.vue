<template>
    <div>
        <h1>Weather Application</h1>
        <map-component />
    </div>
</template>

<script>
import MapComponent from '../components/Map.vue';

export default {
    name: 'Locations',
    components: {
        MapComponent,
    },
};
</script>

<style lang="scss" scoped>
h1 {
    padding: 50px;
}
</style>
