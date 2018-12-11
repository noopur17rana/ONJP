@analysisOfSavings
Feature: Verify optima APIs debit and credit accounts for bob and emma

@analysisOfSavings
Scenario: Verify JSON response message for bob when same APR and AER are used
	Given bob makes a request
	When valid request is logged in to get the optimized savings details
	Then asked details are retrieved with zero optimizeSaving

@analysisOfSavings
Scenario: Verify JSON response message for emma when different APR and AER are used
	Given alice makes a request
	When valid request is logged in to get the optimized savings details
	Then asked details are retrieved with some optimizeSaving

@analysisOfSavings
Scenario: Verify JSON response message for when wrong token used
	Given bob makes a request
	When request is logged in to get the optimized savings details
	Then asked details are not retrieved throwing proper error message