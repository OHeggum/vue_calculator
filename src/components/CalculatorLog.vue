<template>
    <div class="pagination-list">
        <div class="pagination-item" v-for="(item, index) in paginatedItems" :key="index">
            <div class="calculation">
                <span>{{ item.num1 }}</span>
                <span>{{ item.operator }}</span>
                <span>{{ item.num2 }}</span>
                <span>=</span>
                <span>{{ item.result }}</span>
            </div>
        </div>
        <div class="pagination-controls">
            <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
            <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: []
        };
    },
    created() {
        this.fetchCalculations();
    },
    methods: {
        async fetchCalculations() {
            try {
                const response = await fetch('http://localhost:8080/getCalculations');
                if (!response.ok) {
                    throw new Error('Failed to fetch calculations');
                }
                const data = await response.json();
                this.items = data; // Assuming the response is an array of calculations
            } catch (error) {
                console.error('Error fetching calculations:', error);
            }
        }
    }
};
</script>

<style scoped>
.pagination-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 400px; /* Set a maximum width */
    margin: 0 auto; /* Center the component */
}

.pagination-item {
    width: 100%; /* Make each item take full width */
    margin-bottom: 10px;
}

.calculation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    margin-top: 10px;
    padding: 5px 10px;
    cursor: pointer;
}

button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
}
</style>
