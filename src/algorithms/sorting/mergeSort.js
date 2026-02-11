import { ANIMATION_TYPES } from "../../utils/constants";

export function* mergeSort(array) {
    const arr = [...array];
    yield* mergeSortHelper(arr, 0, arr.length - 1);

    // Final sorted
    yield {
        type: ANIMATION_TYPES.SORTED,
        indices: Array.from({ length: arr.length }, (_, i) => i),
        pointers: []
    };
}

function* mergeSortHelper(arr, left, right) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    // Visualize division
    yield {
        type: ANIMATION_TYPES.COMPARE,
        indices: [mid],
        pointers: [
            { index: left, label: 'L', color: 'bg-blue-400' },
            { index: right, label: 'R', color: 'bg-blue-400' }
        ],
        line: 3
    };

    yield* mergeSortHelper(arr, left, mid);
    yield* mergeSortHelper(arr, mid + 1, right);
    yield* merge(arr, left, mid, right);
}

function* merge(arr, left, mid, right) {
    // Calculate sorted order
    const aux = [];
    let p = left;
    let q = mid + 1;

    while (p <= mid && q <= right) {
        if (arr[p].value <= arr[q].value) {
            aux.push(arr[p]);
            p++;
        } else {
            aux.push(arr[q]);
            q++;
        }
    }
    while (p <= mid) {
        aux.push(arr[p]);
        p++;
    }
    while (q <= right) {
        aux.push(arr[q]);
        q++;
    }

    // Visualize overwriting
    for (let idx = 0; idx < aux.length; idx++) {
        yield {
            type: ANIMATION_TYPES.OVERWRITE,
            indices: [left + idx],
            value: aux[idx].value,
            pointers: [
                { index: left + idx, label: 'merge', color: 'bg-green-400' }
            ],
            line: 15
        };

        arr[left + idx] = aux[idx];
    }
}
