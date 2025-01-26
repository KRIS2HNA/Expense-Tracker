// Selecting elements
const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
const totalIncomeEl = document.getElementById('total-income');
const totalExpensesEl = document.getElementById('total-expenses');
const netIncomeEl = document.getElementById('net-income');

// Transaction data array
let transactions = [];

// Helper functions
function updateSummary() {
    const totalIncome = transactions
        .filter(transaction => transaction.type === 'income')
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const totalExpenses = transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    totalIncomeEl.textContent = totalIncome.toFixed(2);
    totalExpensesEl.textContent = totalExpenses.toFixed(2);
    netIncomeEl.textContent = (totalIncome - totalExpenses).toFixed(2);
}

function renderTransactions() {
    transactionList.innerHTML = '';
    transactions.forEach((transaction, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.description}</td>
            <td>${transaction.category}</td>
            <td>${transaction.amount.toFixed(2)}</td>
            <td>${transaction.type}</td>
            <td><button class="action-button" onclick="deleteTransaction(${index})">Delete</button></td>
        `;

        transactionList.appendChild(row);
    });
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateSummary();
    renderTransactions();
}

// Event listeners
transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (!date || !description || !category || isNaN(amount) || !type) {
        alert('Please fill out all fields correctly.');
        return;
    }

    const transaction = {
        date,
        description,
        category,
        amount,
        type
    };

    transactions.push(transaction);
    transactionForm.reset();

    updateSummary();
    renderTransactions();
});
