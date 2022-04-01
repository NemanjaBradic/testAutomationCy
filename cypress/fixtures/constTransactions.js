const request = {
    amount: 123,
    description: 'test request'
}

const payment = {
    amount: 123,
    description: 'test pay'
}

const expectedResult = {
    expectedRequestText: 'Requested $'+ request.amount + '.00 for ' + request.description,
    expectedPaymentText: 'Paid $'+ payment.amount + '.00 for ' + payment.description
}

export { request, payment, expectedResult }