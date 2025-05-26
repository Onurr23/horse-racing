<script setup>
import Horse from './Horse.vue'
import { useStore } from 'vuex';
import { computed, reactive, watch } from 'vue';
import { calculateSpeedPerTick } from '../utils/utils';

const store = useStore();
const horses = computed(() => store.state.horses)
const rounds = computed(() => store.state.rounds)
const isRaceStarted = computed(() => store.state.isRaceStarted);
const currentRound = computed(() => store.state.currentRound)
const horseInfos = reactive({})
let intervalId = null

watch(currentRound, (round) => {
  Object.keys(horseInfos).forEach(key => delete horseInfos[key])

  const horseIds = rounds.value[round]?.horses || []
  horseIds.forEach(horse => {
    const condition = horses.value.find(h => h.id === horse.id)?.condition || 0
    const distance = rounds.value[round].distance
    horseInfos[horse.id] = {
      id: horse.id,
      tick: calculateSpeedPerTick(condition, distance),
      position: 0,
      color:horse.color
    }
  })
}, { immediate: true })

watch([isRaceStarted, rounds, currentRound], ([isRaceStarted, rounds, currentRound]) => {
  if (Object.keys(horseInfos).length === 0 || rounds.length === 0)return;
  if (isRaceStarted) {
    intervalId = setInterval(() => {
      for (const id in horseInfos) {
        horseInfos[id].position += horseInfos[id].tick
      }
      const distance = rounds[currentRound - 1].distance;
      if (Object.values(horseInfos).some(h => h.position >= distance)) {
        clearInterval(intervalId)
        store.commit('SET_IS_RACE_STARTED', false)
        store.commit('ADD_RACE_RESULT', Object.values(horseInfos)?.sort((a, b) => b.position - a.position));
        const timeout = setTimeout(() => {
          store.commit('SET_IS_RACE_STARTED', true)
          clearTimeout(timeout)
        }, 1000)
      }
    }, 50)
  }
})
</script>

<template>
  <div class="race-track-container">
    <div v-for="(horse, index) in Object.values(horseInfos)" :key="horse.id" class="track-lane-container">
      <div class="track-lane-number">
        <p>{{ index + 1 }}</p>
      </div>
      <div class="track-lane">
        <Horse :horse="horse" />
      </div>
    </div>
  </div>
  <div class="race-track-bottom">
    <div class="text-container">
      <h2 class="lap-info">Lap {{ currentRound }} - {{ rounds[currentRound-1]?.distance }} m</h2>
      <h2 class="finish-text">FINISH</h2>
    </div>
  </div>
</template>

<style scoped>
.race-track-container {
  width: 600px;
}

.track-lane-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.track-lane {
  border-top: 1px dashed #545454;
  border-bottom: 1px dashed #545454;
  border-right: 4px solid #DA4F3A;
  width: 100%;
  height: 75px;
  position: relative;
}

.track-lane-number {
  border: 1px solid white;
  background-color: #55783C;
  width: 25px;
  height: 75px;
  text-align: center;

  p {
    transform: rotate(-90deg);
  }
}

.race-track-bottom {
  width: 600px;
  margin-top: 8px;
  padding: 8px 16px;
  border-radius: 4px;
}

.text-container {
  position: relative;
  height: 40px;
}

.lap-info {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.finish-text {
  position: absolute;
  right: 0;
  font-size: 18px;
  font-weight: 700;
  color: #C0362C;
  margin: 0;
}
</style>