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
                      :marker-id="item.id"
                      :key="index"
                      :lat-lng="[item.latitude, item.longitude]"
                      :ref="item._id"
                      @click="triggerRouter"
            >
                <l-tooltip>Click to see weather</l-tooltip>
                <l-popup>
                    <router-view />
                </l-popup>
            </l-marker>

        </l-map>
    </div>
</template>

<script>
import {
    LMap, LTileLayer, LMarker, LTooltip, LPopup,
} from 'vue2-leaflet';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'MapComponent',
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LTooltip,
        LPopup,
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
            markerOptions: {
                markerLatLng: [51.504, -0.159],
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
    updated() { // ugly solution this should be mounted but in mounted it is undefined
        if (this.routeId) {
            this.openRelatedPopup();
        }
    },
    methods: {
        ...mapActions(['fetchLocations']),
        triggerRouter(event) {
            const target = this.getLocations.find((x) => (x.latitude === event.latlng.lat)
             && (x.longitude === event.latlng.lng));
            // eslint-disable-next-line no-underscore-dangle
            const route = `/locations/${target._id}`;
            if (this.$route.path !== route) {
                this.$router.push(route);
            }
        },
        openRelatedPopup() {
            this.$refs[this.routeId][0].mapObject.openPopup();
        },
        restoreRouter() {
            this.$router.push('/locations');
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
