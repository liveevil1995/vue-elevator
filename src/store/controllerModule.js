export const controllerModule = {
	state: {
		allLevel: 5,
		currentLevel: 1,
		elevatorLevels: [],
		elevatorSpeed: "0",
		elevatorStatus: 'wait',
		direction: "null",
	},
	getters: {
		includesLevel: (state) => (newLevel) => {
			return state.elevatorLevels.includes(newLevel);
		},
		getNextLevel: (state) => () => {
			return state.elevatorLevels[0];
		}
	},
	mutations: {
		changeCurrentLevel(state, newLevel) {
			state.currentLevel = newLevel;
		},
		addElevatorLevels(state, newLevel) {
			state.elevatorLevels.push(newLevel);
		},
		deleteElevatorLevel(state) {
			state.elevatorLevels.shift();
		},
		changeElevatorSpeed(state, newSpeed) {
			state.elevatorSpeed = newSpeed;
		},
		changeElevatorStatus(state, newStatus) {
			state.elevatorStatus = newStatus;
		},
		changeDirection(state, newDirection) {
			state.direction = newDirection;
		},
		changeAllLevel(state, newAllLevel) {
			state.allLevel = newAllLevel;
		},
		resetCurrentLevel(state) {
			state.currentLevel = 1;
			state.elevatorLevels = [];
			state.elevatorSpeed = "0";
			state.elevatorStatus = 'wait';
			state.direction = "null";
		}
	},
	actions: {},
};