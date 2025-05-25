<script setup>
import { useStore } from 'vuex';
import { computed, watch } from 'vue';

const store = useStore();
const horses = computed(() => store.state.horses)
const rounds = computed(() => store.state.rounds)
const currentRound = computed(() => store.state.currentRound)

watch(rounds, (newValue) => {
    console.log('rounds', newValue)
},{init:true})

</script>

<template>
    <div class="race-track-container">
        <div v-for="(horse,index) in rounds[currentRound]?.horses" :key="horse.id" class="track-lane-container">
            <div class="track-lane-number">
                <p>{{index+1}}</p>
            </div>
            <div class="track-lane">
            </div>
        </div>
    </div>
    <div class="race-track-bottom">
        <div class="text-container">
            <h2 class="lap-info">Lap {{ currentRound }} - {{ rounds[currentRound]?.distance }} m</h2>
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
}

.track-lane-number {
    border: 1px solid white;
    background-color: #55783C;
    width: 25px;
    height: 75px;
    text-align: center;
    p{
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