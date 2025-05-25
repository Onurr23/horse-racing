<script setup>
import ControlPanel from './components/ControlPanel.vue';
import HorseList from './components/HorseList.vue';
import RaceTrack from './components/RaceTrack.vue';
import { useStore } from 'vuex';
import { onMounted } from 'vue'

const store = useStore();

onMounted(() => {
    store.dispatch('generateHorses');
})

</script>

<template>

    <ControlPanel />
    <div class="race-container">
        <div class="race-element">
            <HorseList />
        </div>
        <div class="race-element">
            <RaceTrack />
        </div>
        <div class="race-element">
            <div></div>
        </div>
    </div>


</template>

<style scoped>
.race-container {
    display: flex;
}

.race-element {
    flex: 1;
    background: #eee;
    padding: 20px;
    text-align: center;
}
</style>
