Feature: Check Navigation headers

    Check if user can navigate to all header tabs

    Scenario: Public tab navigation
    Given user is logged in
    When user navigate to "public" tab
    Then user is on "public" tab

    Scenario: Contacts tab navigation
    Given user is logged in
    When user navigate to "contacts" tab
    Then user is on "contacts" tab

    Scenario: Personal tab navigation
    Given user is logged in
    When user navigate to "personal" tab
    Then user is on "personal" tab