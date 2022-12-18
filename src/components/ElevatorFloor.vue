<template>
    <div class="floor">
        <button
            class="button"
            :disabled="this.currentLevel === floorNumber"
            :checked="this.currentLevel === floorNumber"
            :class="{
                button_call: this.includesLevel(floorNumber),
                button_this_call:
                this.currentLevel === floorNumber && this.elevatorStatus === 'active',
                button_arrived:
                this.currentLevel === floorNumber &&
                this.elevatorStatus === 'arrived',
            }"
            @click="callUpElevator()"
        >
        </button>
        <span class="floor__number">{{ floorNumber }}</span>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapMutations } from "vuex";

    export default {
        name: "floor",
        props: ["floorNumber"],
        computed: {
                ...mapState({
                currentLevel: (state) => state.controller.currentLevel,
                elevatorStatus: (state) => state.controller.elevatorStatus,
                }),
                ...mapGetters(["includesLevel"]),
            },
        methods: {
            ...mapMutations([
            "addElevatorLevels",
            "changeElevatorStatus",
            "changeElevatorSpeed",
            ]),
            callUpElevator() {
            if (
                !this.includesLevel(this.floorNumber) &&
                this.currentLevel != this.floorNumber &&
                this.elevatorStatus === "wait"
            ) {
                this.addElevatorLevels(this.floorNumber);
                this.changeElevatorStatus("start");
            } else if (!this.includesLevel(this.floorNumber)) {
                this.addElevatorLevels(this.floorNumber);
            }
            },
        },
    };

</script>

<style scoped>
.floor {
    background: #fff;
    height: 130px;
    width: 200px;
    display: flex;
    align-items: center;
}

.floor:not(:first-child) {
    border-bottom: 4px solid #191919;
}

.button {
    cursor: pointer;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 10px;
    width: 20px;
    height: 20px;
    margin-left: 10px;
    background-color: rgb(164, 163, 163);
}

.button_call {
    background-color: rgb(238, 238, 17);
}

.button_this_call {
    animation-name: blinkButton;
    animation-timing-function: linear;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    box-shadow: unset;
}

.button_arrived {
    opacity: 0.4;
}

.floor__number {
    margin-left: 10px;
}

@keyframes blinkButton {
    0% {
        background-color: rgb(238, 238, 17);;
    }
    25% {
        background-color: rgb(244, 252, 180);
    }
    50% {
        background-color: rgb(238, 238, 17);
    }
    75% {
        background-color: rgb(244, 252, 180);
    }
    100% {
        background-color: rgb(238, 238, 17);
    }
}
</style>