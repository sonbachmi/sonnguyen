/**
 * Traditional way (procedural): for loop with local counter
 * Complexity: O(n)
 */
export function sum_to_n_a(n: number): number {
    let sum = 0;
	for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Functional way: Reduce function over every value
 * Complexity: O(n)
 * Performance: may be better than A as:
 *  - No need to assign counter to a local variable
 *  - JS engine does optimization under the hood so no worry about function call overhead
 */
export function sum_to_n_b(n: number): number {
    // Concise functional way to create an array of integer range from 1 to n
    const range = Array.from({length: n}, (_:unknown, i:number) => i+1);
    return range.reduce((total, current) => total + current, 0);
}

/**
 * Recursive way: Sum recursively
 * Complexity: O(n)
 * May be overkill in this case, but recursion can be very useful for real problems
 * where the calculation is too complex to include in a loop
 * Performance: may consume more time and resources than simpler ways
 * due to function call overhead and stack building
 */
export function sum_to_n_c(n: number): number {
    if (n === 0) return 0;
    return n + sum_to_n_c(n-1);
}