<script setup>

const props = defineProps(['title','titleColor'])

</script>

<template>
    <div  class="result-container">
        <div class="title">
        <h2>{{title}}</h2>
        </div>
         <slot></slot>
    </div>
</template>

<style scoped>

.title{
    background-color: v-bind('props.titleColor');
}

h2{
    margin:0
}
.result-container {
    width: 100%;
    height: 600px;
    overflow-y: scroll;
    overflow-x: hidden;
}
</style>
