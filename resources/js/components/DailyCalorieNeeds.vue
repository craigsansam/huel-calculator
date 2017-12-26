<template>
    <div class="component" v-if="bmr">
        <div class="title">
            <h3>Daily Calorie Needs</h3>
        </div>

        <div class="form-check">
            <label class="form-check-label">
            <input class="form-check-input" v-model="modifier" type="radio" name="activity-level" value="1.2" checked>
                Sedentary - little or no exercise
            </label>
        </div>

        <div class="form-check">
            <label class="form-check-label">
            <input class="form-check-input" v-model="modifier" type="radio" name="activity-level" value="1.375">
                Lightly active - light exercise/sports 1-3 days/week
            </label>
        </div>

        <div class="form-check">
            <label class="form-check-label">
            <input class="form-check-input" v-model="modifier" type="radio" name="activity-level" value="1.55">
                Moderately Active - moderate exercise/sports 3-5 days/week
            </label>
        </div>

        <div class="form-check">
            <label class="form-check-label">
            <input class="form-check-input" v-model="modifier" type="radio" name="activity-level" value="1.725">
                Very active - hard exercise/sports 6-7 days a week
            </label>
        </div>

        <div class="form-check">
            <label class="form-check-label">
            <input class="form-check-input" v-model="modifier" type="radio" name="activity-level" value="1.9">
                Extra active  - very hard exercise/sports &amp; physical job or 2x training
            </label>
        </div>

        <div class="alert alert-success mt-4" v-show="completed">
            Your daily calorie requirement is <strong>{{ this.calculatedCalories }}</strong>
        </div>
    </div>
</template>

<script>
    import { EventBus } from '../eventbus.js';

    export default {
        props: ['bmr'],
        data() {
            return {
                modifier: 1.2,
            }
        },
        computed: {
            completed() {
                if (this.bmr && this.modifier) {
                    EventBus.$emit('dailyRequirementCalculation', this.calculatedCalories);
                    return true;
                }

                return false;
            },
            calculatedCalories() {
                return _.round(this.bmr * this.modifier);
            }
        }
    }
</script>
