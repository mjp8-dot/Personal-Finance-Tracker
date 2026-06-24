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


function cardsdata() {

    const transactions =
    getTransactionsFromLocalStorage();

    const totaltransactions =
    transactions.length;

    const expenses =
    transactions.filter(
        transaction =>
        transaction.type.toLowerCase() ===
        "expense"
    );

    const avgexpense =
    expenses.reduce(
        (acc, transaction) =>
        acc + transaction.amount,
        0
    ) / (expenses.length || 1);

    const largest =
    expenses.reduce(
        (acc, transaction) =>
        Math.max(
            acc,
            transaction.amount
        ),
        0
    );

    const savings =
    transactions.reduce(
        (acc, transaction) => {

            if (
                transaction.type.toLowerCase() ===
                "income"
            ) {
                return acc +
                transaction.amount;
            }

            return acc -
            transaction.amount;

        },
        0
    );

    const summary = document.getElementById('summarycards');
    summary.innerHTML = `
    <div id = "totaltransactions" class = "card">
        <p><strong>Total Transactions</strong></p><p>${totaltransactions}</p>
    </div>
    <div id = "avgexpense" class = "card">
        <p><strong>Average Expense:</strong></p><p>Rs. ${avgexpense.toLocaleString()}</p>
    </div>
    <div id = "largest" class = "card">
        <p><strong>Largest Transaction:</strong></p><p>Rs. ${largest.toLocaleString()}</p>
    </div>
    <div id = "savings" class = "card">
        <p><strong>Savings:</strong></p><p>Rs. ${savings.toLocaleString()}</p>
    </div>
    `;
   

}

function expensebycategory() {

    const transactions =
    getTransactionsFromLocalStorage();

    const expenses =
    transactions.filter(
        transaction =>
        transaction.type.toLowerCase() ===
        "expense"
    );

    const categoryTotals = {};

    expenses.forEach(transaction => {

        const category =
        transaction.category;

        if (!categoryTotals[category]) {

            categoryTotals[category] = 0;

        }

        categoryTotals[category] +=
        transaction.amount;

    });

    const container =
    document.getElementById(
        "expensebycat"
    );

    if (Object.keys(categoryTotals).length === 0) {
        container.innerHTML =
        "<h2>Expenses By Category</h2><p>No expenses found.</p>";
        return;

    }
    container.innerHTML =
    "<h2>Expenses By Category</h2>";

    const totalExpenses =
    expenses.reduce(
        (acc, transaction) =>
        acc + transaction.amount,
        0
    );

    Object.entries(categoryTotals)
    .forEach(([category, amount]) => {

        const percentage =
        (
            amount /
            (totalExpenses || 1)
        ) * 100;

        const categoryRow =
        document.createElement("div");

        categoryRow.classList.add(
            "category-row"
        );

        categoryRow.innerHTML = `

            <div class="category-info">

                <span>${category}</span>

                <span>
                    ₹${amount.toLocaleString()}
                </span>

            </div>

            <div class="bar-container">

                <div
                    class="bar"
                    style="
                        width:
                        ${percentage}%;
                    "
                ></div>

            </div>

        `;

        container.appendChild(
            categoryRow
        );

    });

}

function incomevsexpense() {

    const transactions =
    getTransactionsFromLocalStorage();

    const income =
    transactions
    .filter(
        transaction =>
        transaction.type.toLowerCase() ===
        "income"
    )
    .reduce(
        (acc, transaction) =>
        acc + transaction.amount,
        0
    );

    const expense =
    transactions
    .filter(
        transaction =>
        transaction.type.toLowerCase() ===
        "expense"
    )
    .reduce(
        (acc, transaction) =>
        acc + transaction.amount,
        0
    );
    const expensepercentage =
    (expense / (income || 1)) * 100;

    const savings =
    income - expense;

    const incomeexpense =
    document.getElementById(
        "income-expense"
    );

    incomeexpense.innerHTML = `
        <h2>Income vs Expense</h2>

        <div class="category-row">
            <div class = "info">
                <span>Income</span>
                <span>Rs. ${income.toLocaleString()}</span>
            </div>
            <div class="bar-container">
                <div
                    class="bar"
                    style="
                        width:
                        ${income > 0 ? 100 : 0}%;
                    "
                ></div>
            </div>
        </div>

        <div class="category-row">
            <div class = "info">
                <span>Expense</span>
                <span>Rs. ${expense.toLocaleString()}</span>
            </div>
            <div class="bar-container">
                <div
                    class="bar"

                    style="
                        width:
                        ${expensepercentage}%;
                    "
                ></div>
            </div>
        </div>

        <div class="savingsrow">
            <p><strong>Savings:</strong> Rs. ${savings.toLocaleString()}</p>
        </div>
    `;

    if (limit()) {
        const expensebar =
        incomeexpense.querySelector(
            ".category-row:nth-child(3) .bar"
        );

        expensebar.classList.add(
            "limitbar"
        );
    }

}


const themeToggle = document.getElementById('theme-toggle');
const newMonthButton = document.getElementById('newMonth');


applyTheme();
cardsdata();
expensebycategory();
incomevsexpense();
// limit();

themeToggle.addEventListener('click', function() {
    toggleTheme();
});

newMonthButton.addEventListener('click', function() {
    newMonth();
});


  
