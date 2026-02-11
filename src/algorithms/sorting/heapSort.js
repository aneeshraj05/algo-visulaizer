import { ANIMATION_TYPES } from '../../utils/constants';

export function* heapSort(array) {
    const arr = [...array];
    const n = arr.length;

    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        yield* heapify(arr, n, i);
    }

    // Extract elements
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        yield {
            type: ANIMATION_TYPES.SWAP,
            indices: [0, i]
        };

        yield {
            type: ANIMATION_TYPES.SORTED,
            indices: [i]
        };

        yield* heapify(arr, i, 0);
    }

    yield {
        type: ANIMATION_TYPES.SORTED,
        indices: [0]
    };
}

function* heapify(arr, n, i) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n) {
        yield { type: ANIMATION_TYPES.COMPARE, indices: [largest, l] };
        if (arr[l].value > arr[largest].value) largest = l;
    }

    if (r < n) {
        yield { type: ANIMATION_TYPES.COMPARE, indices: [largest, r] };
        if (arr[r].value > arr[largest].value) largest = r;
    }

    if (largest !== i) {
        let temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;

        yield {
            type: ANIMATION_TYPES.SWAP,
            indices: [i, largest]
        };

        yield* heapify(arr, n, largest);
    }
}
