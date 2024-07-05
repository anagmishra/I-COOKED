let totalBudget = 0;
const categories = ["Salaries", "Business Development", "Team Building"];
let budgets = {};
let expenses = {};

function showAlert(message, type = 'error') {
    const alertBox = document.createElement('div');
    alertBox.classList.add('alert');
    if (type === 'success') {
        alertBox.classList.add('success');
    }
    alertBox.innerHTML = `
        ${message}
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
    `;
    document.querySelector('.container').prepend(alertBox);
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

function setTotalBudget() {
    totalBudget = parseFloat(document.getElementById('total-budget').value);
    if (isNaN(totalBudget) || totalBudget <= 0) {
        showAlert("Please enter a valid total funding amount.");
        return;
    }
    document.getElementById('budget-allocation-section').style.display = 'block';
    const budgetInputs = document.getElementById('budget-inputs');
    budgetInputs.innerHTML = '';
    categories.forEach(category => {
        budgetInputs.innerHTML += `
            <div>
                <label>${category}</label>
                <input type="number" id="budget-${category}" placeholder="Enter budget percentage for ${category}">
            </div>
        `;
    });
    showAlert("Total budget set successfully!", "success");
}

function setBudgets() {
    let totalPercentage = 0;
    categories.forEach(category => {
        const percentage = parseFloat(document.getElementById(`budget-${category}`).value);
        if (isNaN(percentage) || percentage < 0 || percentage > 100) {
            showAlert("Please enter a valid budget percentage for all categories.");
            return;
        }
        totalPercentage += percentage;
        budgets[category] = totalBudget * (percentage / 100);
    });

    if (totalPercentage !== 100) {
        showAlert("Total budget percentages must sum up to 100.");
        return;
    }

    document.getElementById('expense-tracking-section').style.display = 'block';
    const expenseCategory = document.getElementById('expense-category');
    expenseCategory.innerHTML = '<option value="">Select Category</option>';
    categories.forEach(category => {
        expenseCategory.innerHTML += `<option value="${category}">${category}</option>`;
    });
    showAlert("Budgets set successfully!", "success");
}

function addExpense() {
    const category = document.getElementById('expense-category').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    if (!category) {
        showAlert("Please select a category.");
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        showAlert("Please enter a valid expense amount.");
        return;
    }
    expenses[category] = (expenses[category] || 0) + amount;
    generateReport();
    showAlert("Expense added successfully!", "success");
}

function generateReport() {
    const reportSection = document.getElementById('report-section');
    reportSection.style.display = 'block';
    const report = document.getElementById('report');
    report.innerHTML = '';
    categories.forEach(category => {
        const spent = expenses[category] || 0;
        const remaining = budgets[category] - spent;
        report.innerHTML += `
            <div>
                <strong>${category}:</strong>
                Budget - $${budgets[category].toFixed(2)},
                Spent - $${spent.toFixed(2)},
                Remaining - $${remaining.toFixed(2)}
            </div>
        `;
    });
}

function showChart() {
    const chartSection = document.getElementById('chart-section');
    chartSection.style.display = 'block';
    const chartBody = document.getElementById('chart-body');
    chartBody.innerHTML = '';
    categories.forEach(category => {
        const spent = expenses[category] || 0;
        const remaining = budgets[category] - spent;
        chartBody.innerHTML += `
            <tr>
                <td>${category}</td>
                <td>$${budgets[category].toFixed(2)}</td>
                <td>$${spent.toFixed(2)}</td>
                <td>$${remaining.toFixed(2)}</td>
            </tr>
        `;
    });
}
