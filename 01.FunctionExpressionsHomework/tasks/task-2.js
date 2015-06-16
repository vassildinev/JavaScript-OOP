/* Task description */
/*
	Write a function a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `string`
		3) it must throw an Error if any of the range params is missing
*/

function findPrimes(from, to) {
	var i, j, len, currentNumber, isPrime, result = [];

    if(from === undefined || to === undefined) {
        throw Error('Invalid function parameters.');
    }

    from = from | 0;
    to = to | 0;

	for(i = from; i <= to; i++) {
		isPrime = true;
		currentNumber = i;
		for(j = 2, len = Math.sqrt(currentNumber); j <= len; j++) {
			if(currentNumber % j === 0) {
				isPrime = false;
				break;
			}
		}

		if(isPrime && currentNumber != 1) {
			result.push(currentNumber);
		}
	}

	return result;
}

module.exports = findPrimes;