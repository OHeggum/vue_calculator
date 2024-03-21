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
            items: [],
            pageSize: 10,
            currentPage: 1
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.items.length / this.pageSize);
        },
        paginatedItems() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.items.slice(startIndex, endIndex);
        }
    },
    methods: {
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        }
    },
    created() {
        // Populate items with example calculations (you can replace this with your actual data)
        for (let i = 0; i < 50; i++) {
            const num1 = Math.floor(Math.random() * 10) + 1;
            const num2 = Math.floor(Math.random() * 10) + 1;
            const operators = ['+', '-', '*', '/'];
            const operator = operators[Math.floor(Math.random() * operators.length)];
            let result;
            switch (operator) {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '*':
                    result = num1 * num2;
                    break;
                case '/':
                    result = num1 / num2;
                    break;
                default:
                    result = num1 + num2;
            }
            this.items.push({
                num1,
                num2,
                operator,
                result
            });
        }
    }
};
</script>

<style scoped>
.pagination-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.pagination-item {
    width: 48%;
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
