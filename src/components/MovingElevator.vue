<template>
    <div class="moving">
        <div class="moving__level" v-for="item in allLevel" :key="item"></div>
        <div
            class="elevator"
            ref="elevatorBox"
            :style="[speedMove, move]"
        >
          <div class="elevator__direction">
            <p>{{ this.currentLevel }}</p>
            <span v-if="this.direction === 'up'">▲</span>
            <span v-if="this.direction === 'down'">▼</span>
            <div 
                class="elevator__indicator"
                :class="{
                    arrived: this.elevatorStatus === 'arrived',
                }"
            >
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "levelmoving",
  computed: {
    ...mapState({
      allLevel: (state) => state.controller.allLevel,
      currentLevel: (state) => state.controller.currentLevel,
      elevatorSpeed: (state) => state.controller.elevatorSpeed,
      elevatorStatus: (state) => state.controller.elevatorStatus,
      direction: (state) => state.controller.direction,
    }),
    ...mapGetters(["getNextLevel"]),
    speedMove() {
      return `transition: ${this.elevatorSpeed}s`;
    },
    move() {
      return `bottom: ${(this.currentLevel - 1) * 130}px`;
    },
  },
  methods: {
    ...mapMutations([
      "changeCurrentLevel",
      "changeElevatorStatus",
      "deleteElevatorLevel",
      "changeElevatorSpeed",
      "changeDirection",
    ]),
    runElevator() {
      this.changeElevatorSpeed(
        Math.abs(this.getNextLevel() - this.currentLevel)
      );
      this.changeDirection(
        this.getNextLevel() > this.currentLevel ? "up" : "down"
      );
      this.changeElevatorStatus("active");
      this.changeCurrentLevel(this.getNextLevel());
      this.$refs.elevatorBox.ontransitionend = () => {
        this.changeElevatorStatus("arrived");
        setTimeout(() => {
          this.changeElevatorStatus("wait");
          this.deleteElevatorLevel();
          if (this.getNextLevel()) this.runElevator();
        }, 3000);
      };
    },
  },
  watch: {
    elevatorStatus(newStatus) {
      if (newStatus === "start") {
        this.runElevator();
      }
    },
  },
};

</script>

<style scoped>
.moving {
    display: flex;
    flex-direction: column-reverse;
    border-right: 4px solid #191919;
  }
.moving__level {
    height: 130px;
    width: 70px;
}

.moving__level:not(:first-child) {
    border-bottom: 4px solid #191919;
}

.elevator {
    background-color: #7e7e7e;
    height: 100px;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border: 5px solid #4f4f4f;
}

.elevator::after {
    content: '';
    position: absolute;
    width: 1px;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #4f4f4f;
}

.elevator__direction {
    position: absolute;
    top: -35px;
    width: 70px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: gray;
    border-right: 5px solid #4f4f4f;
    border-left: 5px solid #4f4f4f;
    border-top: 5px solid #4f4f4f;
}

.elevator__indicator {
    width: 15px;
    height: 15px;
    background: rgb(31, 192, 31);
    border-radius: 50%;
    margin-left: 5px;
}

.elevator__indicator_call {
    background-color: red;
}

@keyframes blinkBox {
    0% {
        background-color: red;
    }
    25% {
        background-color: rgb(244, 176, 137);
    }
    50% {
        background-color: red;
    }
    75% {
        background-color: rgb(244, 176, 137);
    }
    100% {
        background-color: red;
    }
}

.arrived {
    animation-name: blinkBox;
    animation-timing-function: linear;
    animation-duration: 3s;
}

</style>