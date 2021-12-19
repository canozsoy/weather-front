<template>
    <div id="mapContainer">
        <l-map class="map"
               :zoom="mapOptions.zoom"
               :center="mapOptions.center"
               :options="mapOptions.options"
               ref="map"
               @popupclose="restoreRouter"
        >
            <l-tile-layer :url="tileOptions.url" :attribution="tileOptions.attribution" />
            <l-marker v-for="(item, index) in getLocations"
                      :key="index"
                      :lat-lng="[item.latitude, item.longitude]"
                      :ref="item._id"
                      @click="triggerRouter"
            >
                <l-tooltip>Click to see weather</l-tooltip>
            </l-marker>
        </l-map>
    </div>
</template>

<script>
import {
    LMap, LTileLayer, LMarker, LTooltip,
} from 'vue2-leaflet';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'MapComponent',
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LTooltip,
    },
    data() {
        return {
            mapOptions: {
                zoom: 2,
                center: [30, 0],
                options: {
                    minZoom: 2, // limiting maximum zoom-out
                    maxBounds: [[-Infinity, -180], [Infinity, 180]], // limiting domain
                },
            },
            tileOptions: {
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            },
            weather: '',
        };
    },
    created() {
        this.fetchLocations();
    },
    computed: {
        ...mapGetters(['getLocations']),
        routeId() {
            return this.$route.params.id;
        },
    },
    watch: {
        $route() {
            this.handleRouteChange();
        },
    },
    async mounted() {
        await this.$nextTick();
        this.handleRouteChange();
    },
    methods: {
        ...mapActions(['fetchLocations', 'fetchWeather']),
        async triggerRouter(event) {
            const target = this.getLocations.find((x) => (x.latitude === event.latlng.lat)
             && (x.longitude === event.latlng.lng));
            // eslint-disable-next-line no-underscore-dangle
            const route = `/locations/${target._id}`;

            if (this.$route.path !== route) {
                await this.$router.push(route);
            }

            this.handleRouteChange();
        },
        handleRouteChange() {
            if (this.routeId) {
                this.openRelatedPopup();
            } else {
                this.closePopups();
            }
        },
        async openRelatedPopup() {
            this.weather = await this.fetchWeather({ id: this.routeId });

            const popUpHTML = `<strong>City:</strong> ${this.weather.name}<br>`
            + `<strong>Weather:</strong> ${this.weather.weather} &#176C`;

            const marker = this.$refs[this.routeId][0].mapObject;
            marker.bindPopup(popUpHTML).openPopup();
        },
        restoreRouter() {
            const route = this.$route.path;
            if (route !== '/locations') {
                this.$router.push('/locations');
            }
        },
        closePopups() {
            this.$refs.map.mapObject.closePopup();
        },
    },
};
</script>

<style lang="scss" scoped>
#mapContainer {
    border: 1px solid #000;
    width: 1000px;
    .map {
    height: 700px;
    }
}

</style>
