<script setup>
const props = defineProps(['title', 'headers', 'rows', 'titleHeaderColor'])

</script>

<template>
    <div class="container">
        <div class="title-container">
            <h2>{{ title }}</h2>
        </div>
        <table>
            <thead>
                <tr>
                    <th v-for="(header, i) in headers" :key="i">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in rows" :key="index">
                    <slot name="row" :row="row" :index="index">
                        <td v-for="(val, key) in row" :key="key">
                            {{ val }}
                        </td>
                    </slot>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.container {
    background-color: #ffff;
    width: 100%;
    color: black;
}

thead {
    background-color: #E1E1E1;
}

.title-container{
    background-color: v-bind(titleHeaderColor);
}

h2{
    margin:0;
}


table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    background-color: "#fffff";
    border: 1px solid #ccc;
    padding: 4px;
    text-align: left;
}
</style>
