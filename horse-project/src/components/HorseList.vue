<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const horses = computed(() => store.state.horses)
</script>


<template>
    <div class="container">
        <h2 class="table-title">Horse List</h2>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Condition</th>
                    <th>Color</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(horse, index) in horses" :key="horse.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ horse.name }}</td>
                    <td>{{ horse.condition }}</td>
                    <td>
                        <span class="color-box" :style="{ backgroundColor: horse.color }"></span>
                        {{ horse.color }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<style scoped>

.container {
    background-color: #ffff;
    width: 400px;
    color: black;
}

.table-title{
    background-color: #F0EB64;
}

thead{
    background-color:#E1E1E1 ;
}


table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    background-color: "#fffff";
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

.color-box {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    vertical-align: middle;
    border: 1px solid #000;
}
</style>
