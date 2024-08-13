# Bank Account Kata

## Overview

This is a frontend implementation of the bank account kata tech challenge. It allows users to deposit, withdraw, and transfer money, and view their account statement. The application uses local state management to handle transactions and maintain the account statement.

## Features

- **Deposit Money:** Users can deposit money into their account.
- **Withdraw Money:** Users can withdraw money from their account.
- **Transfer Money:** Users can transfer money to another IBAN account. Only IBAN accounts are accepted.
- **View Account Statement:** Users can view their account statement with date, amount, and balance. The statement is sorted by date (most recent first) by default.
- **Sort Statement:** Users can sort their account statement by date in ascending or descending order.
- **Search Movements:** Users can filter movements by type (deposits, withdrawals) and view the results sorted by date (most recent first).
- **Pagination:** The application paginates results when there are more than 10 items. Users can navigate between pages.

## Note

- Date range filtering is not implemented in this version of the application.

## Getting Started

To get started with the application, follow these steps:

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/jestinjoshi/code-sherpas-tech-challenge
    cd code-sherpas-tech-challenge
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Run the Development Server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. **Open in Browser:**

    Visit [http://localhost:3000](http://localhost:3000) to see the application in action.

## File Structure

- `pages/`: Contains the main page and other React components.
- `components/`: Contains reusable components like forms and tables.

## Usage

### Deposit Money

1. Click on the "Deposit" button.
2. Enter the amount.
3. Submit the form to add the deposit to the account.

### Withdraw Money

1. Click on the "Withdraw" button.
2. Enter the amount.
3. Submit the form to deduct the amount from the account.

### Transfer Money

1. Click on the "Transfer" button.
2. Enter the recipient IBAN and amount.
3. Submit the form to transfer the amount to the specified IBAN.

### View Account Statement

1. Navigate to the "Account Statement" page.
2. View the list of transactions sorted by date.

### Search Movements

1. Use the search filters to select the type of movement.
2. Click "Search" to view filtered results.

### Pagination

- Use the pagination controls to navigate through the pages of the account statement or search results.

## Future Improvements

- Implement date range filtering for searching movements.