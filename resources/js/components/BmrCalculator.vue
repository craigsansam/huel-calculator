<template>
    <div class="component">
        <div class="title">
            <h3>BMR Calculation</h3>

            <div class="actions hidden-print">
                <div class="form-check">
                    <label class="form-check-label">
                        <input class="form-check-input" type="radio" name="type" id="mode" value="metric" v-model="mode"> Metric
                    </label>

                    <label class="form-check-label">
                        <input class="form-check-input" type="radio" name="type" id="mode" value="imperial" v-model="mode"> Imperial
                    </label>
                </div>
            </div>
        </div>

        I'm a

        <select v-model="gender">
            <option></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>

        and I am

        <input type="text" v-model="age" size="5">

        years old.

        I am

        <span v-if="this.mode == 'metric'">
            <input type="text" v-model="height" size="5">
            cm
        </span>

        <span v-if="this.mode == 'imperial'">
            <input type="text" v-on:keyup="imperialHeightChanged()" :value="imperialHeight.ft" ref="ft" size="5">
            ft,
            <input type="text" v-on:keyup="imperialHeightChanged()" :value="imperialHeight.in" ref="in" size="5">
            in
        </span>

        tall, and I weigh

        <span v-if="this.mode == 'metric'">
            <input type="text" v-model="weight" size="5">
            kg
        </span>

        <span v-if="this.mode == 'imperial'">
            <input type="text" size="5" v-on:keyup="imperialWeightChanged()" ref="lb" :value="imperialWeight">
            lbs
        </span>

        <div class="alert alert-success mt-4" v-show="completed">
            Your BMR is <strong>{{ this.calculatedBMR }}</strong>
        </div>
    </div>
</template>

<script>
    import { EventBus } from '../eventbus.js';

    export default {
        data() {
            return {
                mode: "metric",
                gender: null,
                age: null,
                height: null, // in CM
                weight: null, // in KG
            }
        },
        watch: {
            mode: (value) => {
                EventBus.$emit('mode', value);
            }
        },
        methods: {
            imperialHeightChanged() {
                this.height = _.round(convert(this.$refs.ft.value + '.' + this.$refs.in.value)
                    .from('ft')
                    .to('cm'), 0);
            },
            imperialWeightChanged() {
                this.weight = _.round(convert(this.$refs.lb.value).from('lb').to('kg'), 2);
            }
        },
        computed: {
            completed() {
                if (this.gender && this.age && this.height && this.weight) {
                    EventBus.$emit('bmrCalculation', this.calculatedBMR);
                    return true;
                }

                return false;
            },
            imperialHeight() {
                if (_.isNull(this.height)) {
                    return {ft: null, in: null};
                }

                const imperialHeight = _.round(convert(this.height)
                    .from('cm')
                    .to('ft'), 1);

                const splitImperialHeight = (imperialHeight + "").split('.');


                return {ft: splitImperialHeight[0], in: splitImperialHeight[1] };
            },
            imperialWeight() {
                if (_.isNull(this.weight)) {
                    return null;
                }


                return _.round(convert(this.weight).from('kg').to('lb'), 0);
            },
            calculatedBMR() {
                if (this.gender == "male") {
                     return  _.round(66 + (13.7 * this.weight) + (5 * this.height) - (6.8 * this.age));
                } else {
                    return _.round(655 + (9.6 * this.weight) + (1.8 * this.height) - (4.7 * this.age));
                }
            }
        },
    }
</script>
