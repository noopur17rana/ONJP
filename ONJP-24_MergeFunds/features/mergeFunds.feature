@mergeFunds
Feature: Verify optima APIs debit and credit accounts for bob and emma

Scenario: Verify JSON response message when one to one transfer happens for bob
	Given bob makes a request
	When valid request is logged in to get the merge funds transfer details for bob
	Then asked details are retrieved for bob

Scenario: Verify JSON response message when many to one transfer happens for emma
	Given emma makes a request
	When valid request is logged in to get merge funds transfer details for emma
	Then asked details are retrieved for emma

Scenario: Verify JSON response message when many to one transfer happens for alice with -ve available balance
	Given alice makes a request
	When valid request is logged in to get total merge funds transfer details for alice
	Then asked details are retrieved for alice

Scenario: Verify JSON response message for when wrong token used
	Given bob makes a request
	When request is logged in to get the merge funds transfer details
	Then asked details are not retrieved throwing proper error message