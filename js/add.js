import{
    toggleTheme,
    applyTheme
} from './theme.js';

import{
    updateLocalStorage,
    getTransactionsFromLocalStorage,
    clearLocalStorage,
    getMonthlyLimit,
    newMonth
} from './storage.js';

import{
    settings

} from './settings.js';

const settingsButton = document.getElementById('settings-toggle');
settingsButton.addEventListener('click', settings);   


function limit() {

    const monthlyLimit =
    getMonthlyLimit();

    if (
        monthlyLimit === null ||
        monthlyLimit === undefined
    ) {
        return false;
    }

    const totalExpense =
    searchTransactions("expense")
    .reduce(
        (acc, transaction) =>
        acc + transaction.amount,
        0
    );

    return totalExpense >
    monthlyLimit;

}



function loadficancialActivity() {
    const transactions = getTransactionsFromLocalStorage();

    if (transactions.length === 0) {
        financialactivity.innerHTML = '<p>No transactions added yet.</p>';
        return;
    }
    else{
        financialactivity.innerHTML = '<h2>Financial Activity</h2>';
        transactions.reverse().forEach((transaction, index) => {
            const transactionElement = document.createElement('div');
            transactionElement.classList.add('transaction');
            transactionElement.innerHTML = `
                <p><strong>${transaction.type} : ${transaction.category}</strong></p>
                <p>Rs. ${transaction.amount.toLocaleString()}</p>
                <p>${transaction.date}</p>
            `;
            financialactivity.appendChild(transactionElement);
        });
    }

}

const themeToggle = document.getElementById('theme-toggle');
const addtrans = document.getElementById('addtransbtn');
const financialactivity = document.getElementById('financialactivity');

applyTheme();
loadficancialActivity();



themeToggle.addEventListener('click', function() {
    toggleTheme();
});

addtrans.addEventListener('click', function() {
    const type = document.getElementById('type').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value; 
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    
    if (type && amount && category && description && date) {
        const transaction = {
            type: type.toLowerCase(),
            amount: parseFloat(amount),
            category: category.toLowerCase(),
            description: description,
            date: date,
            id : Date.now()
        };
        updateLocalStorage(transaction);

        // Clear the form after adding the transaction        document.getElementById('type').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('category').value = '';
        document.getElementById('description').value = '';
        document.getElementById('date').value = '';
        alert('Transaction added successfully!');
        loadficancialActivity();
    }
    else{
        alert('Please fill in all fields before adding the transaction.');
    }
})

const newMonthButton = document.getElementById('newMonth');
newMonthButton.addEventListener('click', function() {
    newMonth();
});



// clearLocalStorage();