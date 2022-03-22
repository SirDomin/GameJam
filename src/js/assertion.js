class Assert
{
    static true(test, message = '') {
        if (test === true) {
            console.log('Test Passed: ', message);
        } else {
            console.log('Test Failed: ', message)
        }
    }
}
