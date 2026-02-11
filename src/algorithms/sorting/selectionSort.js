import { ANIMATION_TYPES } from "../../utils/constants";

/**
 * SELECTION SORT ALGORITHM
 * 
 * Description:
 * Selection Sort divides the array into sorted and unsorted portions.
 * It repeatedly finds the minimum element from the unsorted portion
 * and places it at the beginning of the unsorted portion.
 * 
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * 
 * How it works:
 * 1. Find the minimum element in the unsorted portion
 * 2. Swap it with the first element of the unsorted portion
 * 3. Move the boundary between sorted and unsorted portions one step right
 * 4. Repeat until the entire array is sorted
 */
export function* selectionSort(array) {
    const arr = [...array]; // Create a copy to avoid mutating original
    const n = arr.length;

    // Outer loop: moves the boundary of sorted/unsorted portions
    for (let i = 0; i < n; i++) {

        // STEP 1: Assume the first element of unsorted portion is minimum
        let minIdx = i;

        // STEP 2: Find the actual minimum in the unsorted portion
        for (let j = i + 1; j < n; j++) {

            // Compare current element with current minimum
            yield {
                type: ANIMATION_TYPES.COMPARE,
                indices: [minIdx, j],
                pointers: [
                    { index: i, label: 'i', color: 'bg-blue-400' },
                    { index: minIdx, label: 'min', color: 'bg-purple-500' },
                    { index: j, label: 'j', color: 'bg-yellow-400' }
                ],
                line: 5
            };

            // If we found a smaller element, update minIdx
            if (arr[j].value < arr[minIdx].value) {
                minIdx = j;
            }
        }

        // STEP 3: Swap the minimum element with the first unsorted element
        if (minIdx !== i) {

            // Show the swap happening
            yield {
                type: ANIMATION_TYPES.SWAP,
                indices: [i, minIdx],
                pointers: [
                    { index: i, label: 'i', color: 'bg-red-500' },
                    { index: minIdx, label: 'min', color: 'bg-red-500' }
                ],
                line: 10
            };

            // Perform the swap
            let temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }

        // STEP 4: Mark the current position as sorted
        yield {
            type: ANIMATION_TYPES.SORTED,
            indices: [i],
            pointers: [],
            line: 13
        };
    }

    // STEP 5: Mark all elements as sorted
    const allIndices = Array.from({ length: n }, (_, i) => i);
    yield {
        type: ANIMATION_TYPES.SORTED,
        indices: allIndices,
        pointers: []
    };
}
