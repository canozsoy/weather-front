import axios from 'axios';

const getters = {
    getLocations: (state) => state.locations,
};

const actions = {
    async fetchLocations({ commit }) {
        const response = await axios.get('/locations');
        if (!response.data.errors) {
            commit('setLocations', response.data.body);
        }
    },
    async fetchWeather({ commit }, params) {
        const response = await axios.get(`/locations/${params.id}`);
        if (!response.data.errors) {
            return response.data.body;
        }
        commit('');
        return null;
    },
};

const mutations = {
    setLocations(state, payload) {
        state.locations = payload;
    },
};

const state = {
    locations: '',
};

export default {
    state,
    getters,
    actions,
    mutations,
};
