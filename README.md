# 🏥 Afaque Ahmed Hospital Management System (Afaque Ahmed )

## 🌟 Project Overview

This is a modern, responsive, client-side Hospital Management System (HMS) developed using vanilla HTML, CSS, and JavaScript. The system is designed to provide hospital staff with a simple, secure, and efficient way to manage patient records, including diagnosis, medication, and billing information.

The application uses **Browser Local Storage** for data persistence, simulating a database environment on the user's machine. This approach allows the system to be run entirely offline as a static web application.

## ✨ Core Features

The HMS is equipped with key functionalities to streamline daily hospital operations:

### 🔐 Secure Access Control
* **Login & Signup:** A robust authentication mechanism using local storage to verify user credentials before granting dashboard access.
* **Session Management:** Users can securely log in and log out, ensuring data is only accessible to authorized personnel.

### 📝 Patient Record Management
* **Record Creation:** A dedicated form to quickly input new patient data, including name, diagnosis, medication list, and admission date.
* **Automated ID:** Each new patient record is assigned an automatically incrementing unique ID.
* **Dashboard View:** Displays all stored patient records in a clear, interactive, and scrollable table format.

### 📊 Data Reporting & Export
* **CSV Export:** A critical feature that allows staff to export all patient records into an **Excel-compatible CSV file** with a single click for external reporting, auditing, or backup purposes.

### 💻 Modern User Interface (UI)
* **Dark Theme:** Features a professional, animated dark mode for comfortable prolonged use.
* **Responsive Design:** Optimized layout for viewing on different screen sizes.

---

## ⚙️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Core structure and semantic markup of the application. |
| **CSS3** | Custom dark theme styling, animations, and grid-based layout. |
| **Vanilla JavaScript (ES6+)** | Handling authentication, local storage management, CRUD operations for records, and CSV export logic. |
| **Font Awesome** | Used for clear, modern iconography across the dashboard. |

---

## 🚀 Getting Started

To run this project locally, follow these simple steps. No web server is required as it is a client-side application.

### Prerequisites

You only need a modern web browser (like Chrome, Firefox, or Edge).

### Installation and Setup

1.  **Clone the Repository:**
    ```bash
    git clone [YOUR_REPOSITORY_LINK_HERE]
    ```
2.  **Navigate to the Folder:**
    ```bash
    cd hospital-management-system
    ```
3.  **Run the Application:**
    * Locate the `index.html` file within the folder.
    * Double-click on `index.html` to open it in your default web browser.

### Project Files

The system is split across three essential files:

| File Name | Role |
| :--- | :--- |
| `index.html` | Defines the entire structure (Login screen, Dashboard, Forms, and Tables). |
| `style.css` | Manages the visual design, dark theme, and animations. |
| `main.js` | Contains all the application logic: authentication, local storage, record submission, and export functionality. |

---

## 🧑‍💻 Creator

This Hospital Management System was proudly **Created by Afaque Ahmed Indher**.
