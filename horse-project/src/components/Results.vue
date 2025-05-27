<script setup>
import Table from './Table.vue'
import { computed,watch } from 'vue'
import { useStore } from 'vuex'
import ResultTable from './ResultTable.vue'

const store = useStore()
const results = computed(() => store.state.raceResults);

</script>

<template>
    <ResultTable v-if="results.length>0" titleColor="green" title="Result">
        <Table v-for="(result, index) in results" :key="index + 1" :title="'Lap ' + ' ' + (index + 1)"
            :headers="['Position', 'Name']"
            :rows="result.map(horse => ({ position: horse.position, name: horse.name }))"
            :titleHeaderColor="results[index][0].color" />
    </ResultTable>
</template>
