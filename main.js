// main.js - Afaque Ahmed Hospital Management System Logic

const AUTH_KEY = 'hms_users';
const RECORDS_KEY = 'hms_records';
let isSignupMode = false;

// --- DOM Elements (Ensure these IDs match index.html) ---
const authPage = document.getElementById('authPage');
const appPage = document.getElementById('appPage');
const authContainer = document.getElementById('authContainer');
const authForm = document.getElementById('authForm');
const authTitle = document.getElementById('authTitle');
const authSubmitBtn = document.getElementById('authSubmitBtn');
const switchToSignup = document.getElementById('switchToSignup');
const authMessage = document.getElementById('authMessage');
const logoutBtn = document.getElementById('logoutBtn');

const recordForm = document.getElementById('recordForm');
const recordsTableBody = document.getElementById('recordsTableBody');
const recordMessage = document.getElementById('recordMessage');
const exportBtn = document.getElementById('exportBtn');

// --- Utility Functions ---

/** Displays an animated message (success or error) */
function displayMessage(element, message, isError = false) {
    element.textContent = message;
    element.classList.remove('error-message', 'success-message');
    element.classList.add(isError ? 'error-message' : 'success-message');
    
    // Reset for animation
    element.style.opacity = 0;
    element.style.transform = 'translateY(10px)';
    
    // Animate in
    setTimeout(() => {
        element.style.transition = 'opacity 0.5s, transform 0.5s';
        element.style.opacity = 1;
        element.style.transform = 'translateY(0)';
    }, 10);

    // Animate out after 4 seconds
    setTimeout(() => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(-10px)';
    }, 4000);
}

/** Get or initialize user data from localStorage */
function getUsers() {
    try {
        return JSON.parse(localStorage.getItem(AUTH_KEY) || '{}');
    } catch {
        return {};
    }
}

/** Get or initialize patient records from localStorage */
function getRecords() {
    try {
        return JSON.parse(localStorage.getItem(RECORDS_KEY) || '[]');
    } catch {
        return [];
    }
}

// --- Authentication Logic ---

function setAuthMode(isSignup) {
    isSignupMode = isSignup;
    authContainer.style.opacity = 0;
    authContainer.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        // Update texts based on mode
        const switchLink = document.querySelector('.switch-auth a');
        
        if (isSignup) {
            authTitle.textContent = "Create New Account";
            authSubmitBtn.textContent = "Signup";
            switchLink.textContent = "Login Here";
        } else {
            authTitle.textContent = "Login to System";
            authSubmitBtn.textContent = "Login";
            switchLink.textContent = "Signup Here";
        }
        
        // Ensure switch functionality is correct
        switchLink.onclick = (e) => {
            e.preventDefault();
            setAuthMode(!isSignupMode);
        };

        // Animate back in
        authContainer.style.opacity = 1;
        authContainer.style.transform = 'scale(1)';
    }, 300);
}

function handleAuth(e) {
    e.preventDefault();
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const users = getUsers();
    
    authMessage.textContent = '';
    
    if (!username || !password) {
        displayMessage(authMessage, "Please enter Username and Password.", true);
        return;
    }

    if (isSignupMode) {
        if (users[username]) {
            displayMessage(authMessage, "This Username already exists.", true);
            return;
        }
        // Save new user
        users[username] = password;
        localStorage.setItem(AUTH_KEY, JSON.stringify(users));
        displayMessage(authMessage, "Signup Successful! Please Login.", false);
        setAuthMode(false); 
        
    } else { // Login Mode
        if (users[username] && users[username] === password) {
            localStorage.setItem('loggedIn', username);
            displayMessage(authMessage, "Login Successful!", false);
            setTimeout(showApp, 500); 

        } else {
            displayMessage(authMessage, "Invalid Username or Password.", true);
        }
    }
}

// --- App View Switching ---

function showApp() {
    authPage.classList.remove('active');
    appPage.classList.add('active');
    renderRecords(); 
}

function showAuth() {
    localStorage.removeItem('loggedIn');
    appPage.classList.remove('active');
    authPage.classList.add('active');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    setAuthMode(false); 
}

function checkLoginStatus() {
    if (localStorage.getItem('loggedIn')) {
        showApp();
    } else {
        showAuth();
    }
}

// --- Record Management Logic ---

function handleRecordSubmission(e) {
    e.preventDefault();
    
    const name = document.getElementById('patientName').value.trim();
    const diagnosis = document.getElementById('diagnosis').value.trim();
    const medications = document.getElementById('medications').value.trim();
    const date = document.getElementById('dateAdmitted').value;
    const fees = parseFloat(document.getElementById('fees').value) || 0;
    
    if (!name || !diagnosis || !medications || !date) {
        displayMessage(recordMessage, "Please fill in all required fields.", true);
        return;
    }
    
    const records = getRecords();
    const newRecord = {
        id: records.length > 0 ? records[records.length - 1].id + 1 : 1, // Auto-increment ID
        name: name,
        diagnosis: diagnosis,
        medications: medications,
        date: date,
        fees: fees.toFixed(2)
    };
    
    records.push(newRecord);
    localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
    
    displayMessage(recordMessage, `Record ID ${newRecord.id} saved successfully!`, false);
    recordForm.reset();
    renderRecords();
}

function renderRecords() {
    const records = getRecords();
    recordsTableBody.innerHTML = '';
    
    if (records.length === 0) {
        recordsTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #999;">No records found.</td></tr>';
        return;
    }

    records.forEach(record => {
        const row = recordsTableBody.insertRow();
        
        row.innerHTML = `
            <td>${record.id}</td>
            <td>${record.name}</td>
            <td>${record.diagnosis}</td>
            <td title="${record.medications}">${record.medications.substring(0, 30)}${record.medications.length > 30 ? '...' : ''}</td>
            <td>${record.date}</td>
            <td>$${record.fees}</td>
        `;
        // Animation effect for new rows
        row.style.animation = 'fadeIn 0.5s ease-out';
    });
}

// --- Excel (CSV) Export Logic ---

function convertToCSV(records) {
    if (records.length === 0) return '';
    
    const headers = ["ID", "Name", "Diagnosis", "Medications", "Date Admitted", "Fees"];
    let csv = headers.join(',') + '\n';
    
    records.forEach(record => {
        // Simple function to make data safe for CSV (handling commas)
        const safeString = (str) => `"${String(str).replace(/"/g, '""')}"`;

        csv += [
            record.id,
            safeString(record.name),
            safeString(record.diagnosis),
            safeString(record.medications),
            safeString(record.date),
            record.fees
        ].join(',') + '\n';
    });
    
    return csv;
}

function exportRecords() {
    const records = getRecords();
    if (records.length === 0) {
        displayMessage(recordMessage, "No records to export.", true);
        return;
    }
    
    const csvContent = convertToCSV(records);
    // Use BOM for better Excel compatibility with special characters
    const BOM = "\uFEFF"; 
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = `AfaqueAhmedHospital_Report_${new Date().toLocaleDateString('en-CA')}.csv`;
    
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    displayMessage(recordMessage, "CSV File is downloading...", false, true);
}


// --- Event Listeners and Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    
    // Attach event listener for Login/Signup form submission
    authForm.addEventListener('submit', handleAuth);
    
    // Attach event listener for Logout button
    logoutBtn.addEventListener('click', showAuth);
    
    // Attach event listener for record form submission
    recordForm.addEventListener('submit', handleRecordSubmission);
    
    // Attach event listener for CSV export button
    exportBtn.addEventListener('click', exportRecords);
    
    // Initial check for login status
    checkLoginStatus(); 
});