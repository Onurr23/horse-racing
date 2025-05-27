<script setup>
import Table from './Table.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const horses = computed(() => store.state.horses)
</script>


<template>
    <Table title="Horse List" :headers="['#','Name','Condition','Color']" :rows="horses" />
</template>
