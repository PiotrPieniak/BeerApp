<template>
    <nav class="pagination">
        <span class="page-stats">{{pagination.from}} - {{pagination.to}} of {{pagination.total}}</span>
        <a v-if="pagination.prevPage" @click="$emit('prev')">
            <button class="w3-button w3-white w3-border w3-round-large">Prev</button>
        </a>
        <a class="button is-small pagination-previous" v-else disabled>
            Prev
        </a>

        <a v-if="pagination.nextPage" @click="$emit('next')">
            <button class="w3-button w3-white w3-border w3-round-large">Next</button>
        </a>
        <a class="button is-small pagination-next" v-else disabled>
            Next
        </a>
    </nav>
</template>

<style>
button {
    margin: 10px;
}
</style>
<script>
export default {
    props: ['pagination'],
}
</script>
