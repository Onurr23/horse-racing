import { createStore } from 'vuex'
import { ADD_RACE_RESULT, SET_CURRENT_ROUND, SET_HORSES, SET_IS_RACE_FINISHED, SET_IS_RACE_STARTED, SET_ROUNDS } from '../constants/constants'
import { getRandomColor, getRandomCondition } from '../utils/utils'

export default createStore({
    state: {
        horses: [],
        currentRound: null,
        rounds: [],
        results: [],
        isRaceStarted: false,
        raceResults: [],
        isRaceFinished: false
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
            state.raceResults = result;
        },
        SET_IS_RACE_STARTED(state, isRaceStarted) {
            state.isRaceStarted = isRaceStarted
        },
        SET_IS_RACE_FINISHED(state, isRaceFinished) {
            state.isRaceFinished = isRaceFinished
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
                    id: i + 1,
                    name: `Horse ${i + 1}`,
                    condition: getRandomCondition(),
                    color: getRandomColor()
                })
            }
            commit(SET_HORSES, horses)
        },
        generateRounds({ state, commit,dispatch }) {
            if(state.isRaceStarted)return
            if (state.isRaceFinished) {
                commit('RESET_ALL')
                commit(SET_IS_RACE_FINISHED, false);
                dispatch('generateHorses')
            }
            const rounds = [];
            const distances = [1200, 1400, 1600, 1800, 2000, 2200];
            for (let i = 0; i < 6; i++) {
                const shuffled = [...state.horses].sort(() => 0.5 - Math.random())
                const round = {
                    id: i + 1,
                    distance: distances[i],
                    horses: shuffled.slice(0, 10),
                    programData: shuffled.slice(0, 10).sort((a, b) => a.id - b.id)
                }
                rounds.push(round)
            }
            commit(SET_ROUNDS, rounds)
            commit(SET_CURRENT_ROUND, 1)
        },
        startStopRace({ state, commit }) {
            if(state.isRaceFinished || state.rounds.length ===0 || (state.isRaceStarted && state.rounds.length > 0))return;
            const isRaceStarted = !state.isRaceStarted;
            commit(SET_IS_RACE_STARTED, isRaceStarted)
        },
        addRaceResult({ state, commit }, result) {
            const results = [...state.raceResults];
            results.push(result);
            commit(ADD_RACE_RESULT, results)
        },
    },
    getters: {
        currentRace(state) {
            return state.rounds[state.currentRound]
        },
        isRaceStarted(state) {
            return state.isRaceStarted
        },
        getRounds(state) {
            return state.rounds
        }
    }
})    