<script setup>
import {useStore} from 'vuex';
const store = useStore();

</script>

<template>
    <div class="container">
        <div class="button-container">
            <button @click="store.dispatch('generateRounds')" class="button">GENERATE PROGRAM</button>
            <button @click="store.dispatch('startStopRace')" class="button" >START</button>
        </div>
    </div>

</template>

<style scoped>

.container{
    width: 100%;
    height: 60px;
    background-color: #F08C87;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.button-container{
    display: flex;
    justify-content: space-around;
    width: 500px;
}

.button{
    width: 200px;
    height: 40px;
    background-color: #EBEBEB;
    color:black
}

</style>
