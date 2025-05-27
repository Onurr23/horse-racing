<script setup>
import Table from './Table.vue'
import { computed,watch } from 'vue'
import { useStore } from 'vuex'
import ResultTable from './ResultTable.vue';

const store = useStore()
const program = computed(() => store.state.rounds);

</script>

<template>
    <ResultTable v-if="program.length > 0" titleColor="blue" title="Program">
        <Table v-for="(round, index) in program" :key="round.id"
            :title="'Lap ' + ' ' + round.id + ' - ' + round.distance + ' m'" :headers="['#', 'Name']"
            :rows="round.programData.map(horse => ({ id: horse.id, name: horse.name }))"
            />
    </ResultTable>
</template>
