import { ANIMATION_TYPES } from '../../utils/constants';

export function* quickSort(array) {
    const arr = [...array];
    yield* quickSortHelper(arr, 0, arr.length - 1);
}

function* quickSortHelper(arr, low, high) {
    if (low < high) {
        const pivotIndex = yield* partition(arr, low, high);
        yield* quickSortHelper(arr, low, pivotIndex - 1);
        yield* quickSortHelper(arr, pivotIndex + 1, high);
    } else if (low === high) {
        yield {
            type: ANIMATION_TYPES.SORTED,
            indices: [low]
        };
    }
}

function* partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        yield {
            type: ANIMATION_TYPES.COMPARE,
            indices: [j, high]
        };

        if (arr[j].value < pivot.value) {
            i++;
            // Swap
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;

            yield {
                type: ANIMATION_TYPES.SWAP,
                indices: [i, j]
            };
        }
    }

    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    yield {
        type: ANIMATION_TYPES.SWAP,
        indices: [i + 1, high]
    };

    yield {
        type: ANIMATION_TYPES.SORTED,
        indices: [i + 1] // Pivot is sorted
    };

    return i + 1;
}
