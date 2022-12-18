<template>
    <div class="entrance">
        <moving-elevator></moving-elevator>
        <div class="floor-wrapper">
            <elevator-floor v-for="item in allLevel" :key="item" :floorNumber="item"></elevator-floor>
        </div>
    </div>
    <div class="settings">
        <input
            v-model="newAllLevel"
            class="setting__input"
            placeholder="Введите количество этажей"
            type="number"
            v-on:keyup.enter="changeLevel(this.newAllLevel)"
        />
        <button
        class="setting__button"
        type="button"
        @click="changeLevel(this.newAllLevel)"
        >
        ОК
        </button>
    </div>
</template>

<script>

import ElevatorFloor from './ElevatorFloor.vue';
import MovingElevator from './MovingElevator.vue';
import { mapState, mapMutations } from "vuex";

export default {
    components: {
        ElevatorFloor, MovingElevator
    },
    name: "entrance",
    data() {
        return {
        newAllLevel: "",
        };
    },
    computed: {
        ...mapState({
        allLevel: (state) => state.controller.allLevel,
        elevators: (state) => state.controller.elevators,
        }),
    },
    methods: {
        ...mapMutations(["changeAllLevel", "resetCurrentLevel"]),
        changeLevel(newAllLevel) {
        if (newAllLevel < 2) {
            this.resetCurrentLevel();
            this.changeAllLevel(2);
            this.newAllLevel = "";
        } else {
            this.resetCurrentLevel();
            this.changeAllLevel(this.newAllLevel);
            this.newAllLevel = "";
        }
        },
    },
}
</script>

<style scoped>
.entrance {
    position: relative;
    border: 4px solid #191919;
    display: flex;
    justify-content: center;
    margin-top: 100px;
    z-index: 2;
}

.floor-wrapper {
    display: flex;
    flex-direction: column-reverse;
}

.settings {
    display: flex;
    width: 250px;
    height: 25px;
    z-index: 2;
}

.setting__input {
    width: 100%;
    outline: none;
    border: 1px solid #191919;
    padding-left: 10px;
}

.setting__button {
    width: 40px;
    background-color: #191919;
    color: #fff;
}
</style>