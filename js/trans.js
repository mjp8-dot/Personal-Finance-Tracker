import{
    toggleTheme,
    applyTheme
} from './theme.js';

import{
    updateLocalStorage,
    getTransactionsFromLocalStorage,
    clearLocalStorage,
    newMonth,
    searchTransactions,
    deleteTransaction,
    editTransaction,
    getMonthlyLimit
} from './storage.js';

import{
    settings
} from './settings.js';

const settingsButton = document.getElementById('settings-toggle');
settingsButton.addEventListener('click', settings);   


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
    return false;
}

function loadTransactions(type = "") {
    const transactionsbytype = searchTransactions(type);
    const transactionsContainer = document.getElementById('transactions');
    if (transactionsbytype.length === 0) {
        transactionsContainer.innerHTML = '<h1>Transactions</h1><p>No transactions found.</p>';
        return;
    }
    else {
        transactionsContainer.innerHTML = '<h1>Transactions</h1>';
        transactionsbytype.reverse().forEach((transaction, index) => {
            const transactionElement = document.createElement('div');
            transactionElement.classList.add('transaction');
            transactionElement.innerHTML = `
                <p><strong>${transaction.type} : ${transaction.category}</strong></p>
                <p>Rs. ${transaction.amount.toLocaleString()}</p>
                <p>${transaction.date}</p>
                <div id = "description"><p>${transaction.description}</p></div>
                <div id = "buttons">
                <button class="button deletebtn" data-id="${transaction.id}"> Delete </button>
                <button class = "button editbtn" data-id = "${transaction.id}">Edit</button>
                </div>
            `;
            transactionsContainer.appendChild(transactionElement);
        });
    }

}

const themeToggle = document.getElementById('theme-toggle');
const newMonthButton = document.getElementById('newMonth');
const search = document.getElementById('search');
const allbtn = document.querySelector('#filter button:nth-child(1)');
const incomebtn = document.querySelector('#filter button:nth-child(2)');
const expensebtn = document.querySelector('#filter button:nth-child(3)');

if (limit()) {
    expensebtn.classList.add('limitbtn');
}

applyTheme();
loadTransactions();


document
.getElementById('transactions')
.addEventListener('click', function(event){

    if(
        event.target.classList
        .contains('deletebtn')
    ){

        const id =
        event.target.dataset.id;

        deleteTransaction(id);

        loadTransactions();
    }

});

document
.getElementById("transactions")
.addEventListener("click", function(event){

    if(
        event.target.classList
        .contains("editbtn")
    ){

        editTransaction(
            event.target.dataset.id
        );

    }

});


allbtn.addEventListener('click', function() {
    loadTransactions();
})

incomebtn.addEventListener('click', function() {
    loadTransactions("income");
})

expensebtn.addEventListener('click', function() {
    loadTransactions("expense");
    
})



themeToggle.addEventListener('click', function() {
    toggleTheme();
});

newMonthButton.addEventListener('click', function() {
    newMonth();
});

search.addEventListener('keydown', function() {
    if (event.key === 'Enter') {
        const searchTerm = search.value.trim().toLowerCase();
        loadTransactions(searchTerm);
    }
});


