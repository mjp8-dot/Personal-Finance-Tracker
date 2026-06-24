import{
    toggleTheme,
    applyTheme
} from './theme.js';

import{
    updateLocalStorage,
    getTransactionsFromLocalStorage,
    clearLocalStorage,
    newMonth,
    getMonthlyLimit,
    searchTransactions
} from './storage.js';

import{
    settings
} from './settings.js';

function limit() {
    const limit = getMonthlyLimit();

    const expense = searchTransactions("expense");
    const totalExpense = expense.reduce((acc, transaction) => acc + transaction.amount, 0);

    if (limit === null) {
        return false;
    } 
    else if (totalExpense > limit) {
        alert("You have exceeded your monthly expenditure limit!");
        return true;
    }

    

}


function updateBalance() {
    const balcard = document.getElementById('balance');
    const transactions = getTransactionsFromLocalStorage();
    let balance = 0;
    if (transactions.length === 0) {
        balcard.innerHTML = `<p class = "card-title"><strong>Balance</strong></p> <p>Rs. 0</p>`;
        return;
    }
    transactions.forEach(function(transaction) {
        if (transaction.type === 'income') {
            balance += transaction.amount;
        } else if (transaction.type === 'expense') {
            balance -= transaction.amount;
        }
    });
    balcard.innerHTML = `<p class = "card-title"><strong>Balance</strong></p> <p>Rs. ${balance.toLocaleString()}</p>`;
}

function updateIncome() {
    const incard = document.getElementById('income');
    const transactions = getTransactionsFromLocalStorage();
    let income = 0;
    if (transactions.length === 0) {
        incard.innerHTML = `<p class = "card-title"><strong>Income</strong></p> <p>Rs. 0</p>`;
        return;
    }
    transactions.forEach(function(transaction) {
        if (transaction.type === 'income') {
            income += transaction.amount;
        }
    });
    incard.innerHTML = `<p class = "card-title"><strong>Income</strong></p> <p>Rs. ${income.toLocaleString()}</p>`;
}

function updateExpense() {
    const expcard = document.getElementById('expense');

    if (limit()) {
        expcard.classList.add('limit');
    }

    const transactions = getTransactionsFromLocalStorage();
    let expense = 0;
    if (transactions.length === 0) {
        expcard.innerHTML = `<p class = "card-title"><strong>Expense</strong></p> <p>Rs. 0</p>`;
        return;
    }
    transactions.forEach(function(transaction) {
        if (transaction.type === 'expense') {
            expense += transaction.amount;
        }
    });
    expcard.innerHTML = `<p class = "card-title"><strong>Expense</strong></p> <p>Rs. ${expense.toLocaleString()}</p>`;
}

function loadRecentTransactions() {
    const recenttransaction = document.getElementById('recenttransaction');
    const transactions = getTransactionsFromLocalStorage();
    if (transactions.length === 0) {
        recenttransaction.innerHTML = '<p>No transactions added yet.</p>';
        return;
    }
    else{
        recenttransaction.innerHTML = '<h2>Recent Transactions</h2>';
        transactions.reverse().slice(0, 3).forEach((transaction, index) => {
            const transactionElement = document.createElement('div');
            transactionElement.classList.add('transaction');
            transactionElement.innerHTML = `
                <p><strong>${transaction.type} : ${transaction.category}</strong></p>
                <p>Rs. ${transaction.amount.toLocaleString()}</p>
                <p>${transaction.date}</p>
            `;
            recenttransaction.appendChild(transactionElement);
        });
    }
}

loadRecentTransactions();

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', function() {
    toggleTheme();
});

const newMonthButton = document.getElementById('newMonth');
newMonthButton.addEventListener('click', function() {
    newMonth();
});

const settingsButton = document.getElementById('settings-toggle');
settingsButton.addEventListener('click', settings);   

applyTheme();

updateBalance();
updateIncome();
updateExpense();





