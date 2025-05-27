<script setup>
import Horse from './Horse.vue'
import { useStore } from 'vuex';
import { computed, reactive, watch,onUnmounted } from 'vue';
import { calculateSpeedPerTick } from '../utils/utils';
import { SET_CURRENT_ROUND, SET_IS_RACE_FINISHED, SET_IS_RACE_STARTED } from '../constants/constants';

const store = useStore();
const horses = computed(() => store.state.horses)
const rounds = computed(() => store.state.rounds)
const isRaceStarted = computed(() => store.state.isRaceStarted);
const currentRound = computed(() => store.state.currentRound);
const isRaceFinished = computed(() => store.state.isRaceFinished);
const horseInfos = reactive({})
let intervalId = null

watch(currentRound, (round) => {
  Object.keys(horseInfos).forEach(key => delete horseInfos[key])

  const horseIds = rounds.value[round-1]?.horses || []
  horseIds.forEach(horse => {
    const condition = horses.value.find(h => h.id === horse.id)?.condition || 0
    const distance = rounds.value[round-1].distance
    horseInfos[horse.id] = {
      id: horse.id,
      name: horse.name,
      tick: calculateSpeedPerTick(condition, distance),
      position: 0,
      color: horse.color
    }
  })
})

watch([isRaceStarted, rounds, currentRound], ([isRaceStarted, rounds, currentRound]) => {
  if (Object.keys(horseInfos).length === 0 || rounds.length === 0) return;
  if (isRaceStarted) {
    intervalId = setInterval(() => {
      for (const id in horseInfos) {
        horseInfos[id].position += horseInfos[id].tick
      }
      const distance = rounds[currentRound - 1].distance;
      if (Object.values(horseInfos).some(h => h.position >= distance)) {
        clearInterval(intervalId)
        store.commit(SET_IS_RACE_STARTED, false)
        store.dispatch('addRaceResult', Object.values(horseInfos)?.sort((a, b) => b.position - a.position).map((result, index) => ({ ...result, position: index + 1 })))
       if(currentRound !== rounds.length){
         store.commit(SET_CURRENT_ROUND, currentRound + 1);
         const timeout = setTimeout(() => {
           store.commit(SET_IS_RACE_STARTED, true)
           clearTimeout(timeout)
         }, 1000)
       }else{
        store.commit(SET_IS_RACE_FINISHED, true);
       }
      }
    }, 50)
  }
})

onUnmounted(() => clearInterval(intervalId))

</script>

<template>
  <div class="race-track-container">
    <h2 v-if="isRaceFinished">RACE IS FINISHED !</h2>
    <div v-for="(horse, index) in Object.values(horseInfos)" :key="horse.id" class="track-lane-container">
      <div class="track-lane-number">
        <p>{{ index + 1 }}</p>
      </div>
      <div class="track-lane">
        <Horse v-if="!isRaceFinished" :horse="horse" />
      </div>
    </div>
  </div>
  <div v-if="currentRound" class="race-track-bottom">
    <div v-if="!isRaceFinished" class="text-container">
      <h2 class="lap-info">Lap {{ currentRound }} - {{ rounds[currentRound - 1]?.distance }} m</h2>
      <h2 class="bottom-text">FINISH</h2>
    </div>
  </div>
</template>

<style scoped>

h2{
    color: #C0362C;
}

.race-track-container {
  width: 100%;
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

.bottom-text {
  position: absolute;
  right: 0;
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}
</style>