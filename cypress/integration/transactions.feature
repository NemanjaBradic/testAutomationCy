Feature: New transaction

    Create different transactions

    Scenario: Create new transaction request
    Given user is logged in
    When user creates a new "request" transaction
    Then transactions is requested
    And user is redirected to "Public" page
    And user is logged out

    Scenario: Create new transaction payment
    Given user is logged in
    When user creates a new "payment" transaction
    Then transactions is payment
    And user is redirected to "Public" page
    And user is logged out