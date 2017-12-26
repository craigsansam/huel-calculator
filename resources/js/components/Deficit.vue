<template>
    <div class="component" v-if="dailyRequirement">
        <div class="title">
            <h3>Deficit</h3>
        </div>

        <p>Enter your required calorie deficit per day here (0 for none). A 500 calorie deficit equates to approximatly {{ exampleDeficit }} loss per week.</p>

        <input type="text" v-model="deficit" value="500">

        <div class="alert alert-success mt-4" v-show="completed">
            Your daily calorie intake with the deficit is <strong>{{ this.calculatedCalories }}</strong>
        </div>
    </div>
</template>

<script>
    import { EventBus } from '../eventbus.js';

    export default {
        props: ['mode', 'dailyRequirement'],
        data() {
            return {
                deficit: 500,
            }
        },
        mounted() {
            EventBus.$emit('caloriesWithDeficit', this.calculatedCalories);
        },
        computed: {
            exampleDeficit() {
                if (this.mode == "imperial") {
                    return "1lb";
                }

                return _.round(convert(1).from('lb').to('g')) + 'g';
            },
            completed() {
                if (this.deficit) {
                    EventBus.$emit('caloriesWithDeficit', this.calculatedCalories);
                    return true;
                }

                return false;
            },
            calculatedCalories() {
                return this.dailyRequirement - this.deficit;
            }
        }
    }
</script>
