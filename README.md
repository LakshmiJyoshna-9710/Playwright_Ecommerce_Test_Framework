# Playwright Automation Framework

## 📌 Project Overview

This repository contains an **End-to-End UI Automation Framework** built using **Playwright with JavaScript**.
The framework follows the **Page Object Model (POM)** design pattern to maintain reusable, scalable, and maintainable automation code.

The tests are implemented against the **AutomationExercise** website and cover multiple real-world UI automation scenarios.

![Playwright Tests](https://github.com/LakshmiJyoshna-9710/Playwright_Automation_Framework/actions/workflows/playwright.yml/badge.svg)

---

## 🚀 Tech Stack

* Playwright
* JavaScript
* Node.js
* Page Object Model (POM)
* Git & GitHub

---

## 📂 Project Structure

```
playwright-automation-framework
│
├── tests/                # Test case files
├── pages/                # Page Object classes
├── helpers/              # Helper utilities
├── utils/                # Common reusable utilities
├── test-data/            # Test data files (JSON)
│
├── playwright.config.js  # Playwright configuration
├── package.json          # Project dependencies
└── README.md
```

---

## ✅ Features Implemented

* End-to-End UI automation using Playwright
* Page Object Model (POM) design pattern
* Dynamic test data generation
* JSON-based test data management
* File upload validation
* File download validation
* Alert handling
* Search functionality validation
* Scrolling and element interaction handling
* Assertions for UI validations

---

## 🧪 Test Scenarios Covered

Some of the automated scenarios include:

* User Registration
* Login and Logout
* Product Search
* Add to Cart
* Checkout Process
* File Upload
* Download Invoice
* Alerts Handling
* Product Validation

---

## ⚙️ Installation

Clone the repository

```
git clone https://github.com/your-username/playwright-automation-framework.git
```

Navigate to the project folder

```
cd playwright-automation-framework
```

Install dependencies

```
npm install
```

---

## ▶️ Running Tests

Run all tests

```
npx playwright test
```

Run tests in headed mode

```
npx playwright test --headed
```

Run the specific test file

```
npx playwright test tests/login.spec.js
```

---

## 📊 Test Reports

Playwright generates HTML reports automatically.

To open the report:

```
npx playwright show-report
```

---

## 🔧 Future Enhancements

* CI/CD integration using GitHub Actions
* Parallel test execution optimization
* Cross-browser execution improvements
* Reporting integration

---

## 👨‍💻 Author

**Lakshmi Jyoshna Nunna**

QA Automation Engineer
Playwright | JavaScript | Test Automation
