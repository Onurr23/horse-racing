import { createStore } from 'vuex'

function getRandomCondition() {
    return Math.floor(Math.random() * 100) + 1 // 1–100
}

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
}

export default createStore({
    state: {
        horses: [],
        currentRound: 1,
        rounds: [],
        results: [],
        isRaceStarted: false
    },
    mutations: {
        SET_HORSES(state, horses) {
            state.horses = horses
        },
        SET_ROUNDS(state, rounds) {
            state.rounds = rounds
        },
        SET_CURRENT_ROUND(state, round) {
            state.currentRound = round
        },
        ADD_RACE_RESULT(state, result) {
            state.raceResults.push(result)
        },
        SET_IS_RACE_STARTED(state, isRaceStarted) {
            state.isRaceStarted = isRaceStarted
        },
        RESET_ALL(state) {
            state.horses = []
            state.currentRound = 1
            state.rounds = []
            state.raceResults = []
        }
    },
    actions: {
        generateHorses({ commit }) {
            const horses = []
            for (let i = 0; i < 20; i++) {
                horses.push({
                    id: i+1,
                    name: `Horse ${i + 1}`,
                    condition: getRandomCondition(),
                    color: getRandomColor()
                })
            }
            commit('SET_HORSES', horses)
        },
        generateRounds({ state, commit }) {
            const rounds = [];
            const distances = [1200, 1400, 1600, 1800, 2000, 2200];
            const horseIds = state.horses.map(horse => horse.id);
            for (let i = 0; i < 6; i++) {
                const shuffled = [...horseIds].sort(() => 0.5 - Math.random())
                const round = {
                    id: i+1,
                    distance: distances[i],
                    horses: shuffled.slice(0, 10)
                }
                rounds.push(round)
            }
            commit('SET_ROUNDS', rounds)
        },
        startStopRace({ state, commit }) {
            const isRaceStarted = !state.isRaceStarted;
            commit('SET_IS_RACE_STARTED', isRaceStarted)
        }
    },
    getters: {
        currentRace(state) {
            return state.rounds[state.currentRound]
        },
        isRaceStarted(state) {
            return state.isRaceStarted
        },
        getRounds(state){
            return state.rounds
        }
    }
})    