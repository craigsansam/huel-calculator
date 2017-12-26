window._ = require('lodash');
window.$ = window.jQuery = require('jquery');

window.Vue = require('vue');
window.convert = require('convert-units');


import { EventBus } from './eventbus.js';

const app = new Vue({
    el: '#app',

    components: {
        'bmr-calculator': require('./components/BmrCalculator.vue'),
        'daily-calorie-needs': require('./components/DailyCalorieNeeds.vue'),
        'deficit': require('./components/Deficit.vue'),
        'huel-calculator': require('./components/Huel.vue'),
    },

    mounted() {
        EventBus.$on('mode', (mode) => {
            this.mode = mode;
        });

        EventBus.$on('bmrCalculation', (calculation) => {
            this.bmr = calculation;
        });

        EventBus.$on('dailyRequirementCalculation', (calculation) => {
            this.dailyRequirement = calculation;
        });

        EventBus.$on('caloriesWithDeficit', (calories) => {
            this.caloriesWithDeficit = calories;
        })
    },

    data() {
        return {
            mode: "metric",
            bmr: null,
            dailyRequirement: null,
            caloriesWithDeficit: null,
        }
    },
});
