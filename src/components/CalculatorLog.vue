<template>
    <div class = "log-wrapper">
        <div class="log-header">
            <div class="title-container">
                <h1 class="title">Log</h1>
            </div>
            <div id="clear-log-btn" @click="$emit('clearLogClick')">Clear Log</div>

        </div>
        <hr />
        <ul id="log-list">
            <li v-for="log_item in log"> {{log_item}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        log: {
            type: Array,
            default: [],
            required: false,
        },
    },
};
</script>

<style>
* {
    color: white;
    user-select: none;
}

hr {
    margin: 0 auto;
    width: 90%;
}

.log-wrapper {
    background-color: #333;
    border-radius: 10px;
    display: flex;
    flex-flow: column;
    width: 400px;
}

.log-header {
    display: flex;
    align-items: center;
    position: sticky;
}

.title-container {
    display: flex;
    justify-content: center;
    margin-left: 140px;
    flex-grow: 1;
}

.title {
    font-size: 2rem;
    margin: 10px;
}

#clear-log-btn {
    border-radius: 10px;
    font-size: 1.5rem;
    margin: 10px;
    padding: 10px;
}

#clear-log-btn:hover {
    background-color: #222;
    cursor: pointer;
}

#clear-log-btn:active {
    background-color: #111;
}

#log-list::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
}

#log-list::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;
    border-radius: 10px;
}

#log-list::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #555;
}
</style>