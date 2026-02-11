import { ANIMATION_TYPES } from "../../utils/constants";

export function* quickSort(array) {
    const arr = [...array];
    yield* quickSortHelper(arr, 0, arr.length - 1);

    // Final sorted
    yield {
        type: ANIMATION_TYPES.SORTED,
        indices: Array.from({ length: arr.length }, (_, i) => i),
        pointers: []
    };
}

function* quickSortHelper(arr, low, high) {
    if (low < high) {
        const pi = yield* partition(arr, low, high);
        yield* quickSortHelper(arr, low, pi - 1);
        yield* quickSortHelper(arr, pi + 1, high);
    }
}

function* partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    // Show pivot
    yield {
        type: ANIMATION_TYPES.COMPARE,
        indices: [high],
        pointers: [
            { index: high, label: 'Pivot', color: 'bg-pink-500' }
        ],
        line: 10
    };

    for (let j = low; j < high; j++) {
        yield {
            type: ANIMATION_TYPES.COMPARE,
            indices: [j, high],
            pointers: [
                { index: high, label: 'P', color: 'bg-pink-500' },
                { index: j, label: 'j', color: 'bg-yellow-400' }
            ],
            line: 11
        };

        if (arr[j].value < pivot.value) {
            i++;
            // Swap
            yield {
                type: ANIMATION_TYPES.SWAP,
                indices: [i, j],
                pointers: [
                    { index: i, label: 'i', color: 'bg-red-500' },
                    { index: j, label: 'j', color: 'bg-red-500' }
                ],
                line: 13
            };
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    // Swap pivot to correct position
    yield {
        type: ANIMATION_TYPES.SWAP,
        indices: [i + 1, high],
        pointers: [
            { index: i + 1, label: 'pivot', color: 'bg-green-500' }
        ],
        line: 17
    };
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    return i + 1;
}
