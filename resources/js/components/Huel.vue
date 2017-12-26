<template>
    <div class="component" v-if="dailyRequirement">
        <div class="title">
            <h3>Huel Calculator</h3>
        </div>

        <h5>Calorie Split</h5>
        <div class="row">
            <div class="form-group col-md-4">
                <label for="staticEmail" class="col-form-label">Breakfast</label>
                <div class="input-group">
                    <input type="text" class="form-control" v-model="split.breakfast">
                    <div class="input-group-addon">%</div>
                </div>
            </div>

            <div class="form-group col-md-4">
                <label for="staticEmail" class="col-form-label">Lunch</label>
                <div class="input-group">
                    <input type="text" class="form-control" v-model="split.lunch">
                    <div class="input-group-addon">%</div>
                </div>
            </div>

            <div class="form-group col-md-4">
                <label for="staticEmail" class="col-form-label">Dinner</label>
                <div class="input-group">
                    <input type="text" class="form-control" v-model="split.dinner">
                    <div class="input-group-addon">%</div>
                </div>
            </div>
        </div>

        <h5>Huel Info</h5>
        <div class="row">
            <div class="form-group col-md-4">
                <label for="staticEmail" class="col-form-label">Calories per 100g</label>
                <input type="text" class="form-control" v-model="huelCalories">
            </div>

            <div class="form-group col-md-4">
                <label for="staticEmail" class="col-form-label">Huel/Water Ratio</label>
                <input type="text" class="form-control" v-model="ratio">
            </div>
        </div>

        <h5>Calculations</h5>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th></th>
                    <th>Calories</th>
                    <th>Huel (g)</th>
                    <th>Water (ml)</th>
                </tr>
            </thead>
            <tr>
                <th>Breakfast</th>
                <td>{{ caloriesBreakfast }}</td>
                <td>{{ huelBreakfast }}g</td>
                <td>{{ waterBreakfast }}ml</td>
            </tr>
            <tr>
                <th>Lunch</th>
                <td>{{ caloriesLunch }}</td>
                <td>{{ huelLunch }}g</td>
                <td>{{ waterLunch }}ml</td>
            </tr>
            <tr>
                <th>Dinner</th>
                <td>{{ caloriesDinner }}</td>
                <td>{{ huelDinner }}g</td>
                <td>{{ waterDinner }}ml</td>
            </tr>
        </table>

    </div>
</template>

<script>
    import { EventBus } from '../eventbus.js';

    export default {
        props: ['dailyRequirement'],
        data() {
            return {
                huelCalories: 400,
                split: {
                    breakfast: 25,
                    lunch: 40,
                    dinner: 35,
                },
                ratio: 0.25
            }
        },
        computed: {
            caloriesBreakfast() {
                return _.round(this.percentageOfCalories(this.split.breakfast));
            },
            huelBreakfast() {
                return this.huelForPercentage(this.split.breakfast);
            },
            waterBreakfast() {
                return _.round(this.huelBreakfast / this.ratio);
            },

            caloriesLunch() {
                return _.round(this.percentageOfCalories(this.split.lunch));
            },
            huelLunch() {
                return this.huelForPercentage(this.split.lunch);
            },
            waterLunch() {
                return _.round(this.huelLunch / this.ratio);
            },

            caloriesDinner() {
                return _.round(this.percentageOfCalories(this.split.dinner));
            },
            huelDinner() {
                return this.huelForPercentage(this.split.dinner);
            },
            waterDinner() {
                return _.round(this.huelDinner / this.ratio);
            },
        },

        methods: {
            percentageOfCalories(percentage) {
                return (this.dailyRequirement / 100) * percentage;
            },
            huelForPercentage(percentage) {
                return _.round((this.percentageOfCalories(percentage) / this.huelCalories) * 100);
            },
        }
    }
</script>
