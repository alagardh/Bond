const express = require('express');

//const ledger = new Ledger({ httpBaseUrl: 'http://localhost:7575/' });
const ledgerAuthentication = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2RhbWwuY29tL2xlZGdlci1hcGkiOnsibGVkZ2VySWQiOiJzYW5kYm94IiwiYXBwbGljYXRpb25JZCI6Ik1haW4iLCJhY3RBcyI6WyJBbGljZTo6MTIyMGM3M2Y1MDUxM2Y2MzhjODJhZmQ2NGM0OTdlZTBiNmU1OTlmNzBkNTg0Y2M3NGM0MDMzNzAwODRhNTA0MmQxMDciXX19.JkmaW-glLl56QpzQAdNDSNQiqjcNZnW8srgvbeq9JpQ";
const app = express();
const port = 3000;

// Function to check for new LoanAgreements
async function checkForLoanAgreements() {
    try {
        const response = await fetch('http://127.0.0.1:7575/v1/query', {
        method: 'post',
        body: JSON.stringify({'templateIds': ['Main:LoanAgreement','Main:LoanRequest']}),
        headers: {'Content-Type': 'application/json',
        'Authorization': ledgerAuthentication}
    });
    const contracts = await response.json();
        contracts.result.forEach(contract => {
            console.log('Loan agreement accepted:', contract.payload);
            // Here you can add logic to notify or trigger Ethereum transaction
        });
    } catch (error) {
        console.error('Error fetching contracts:', error);
    }
}

// Set an interval to check for LoanAgreements
setInterval(checkForLoanAgreements, 5000); // checks every 5 seconds

app.listen(port, () => {
    console.log(`Node.js app listening at http://localhost:${port}`);
});