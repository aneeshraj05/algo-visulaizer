import { ANIMATION_TYPES } from "../../utils/constants";

export function* binarySearch(array, target) {
    let low = 0;
    let high = array.length - 1;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);

        // Show L, M, R pointers
        yield {
            type: ANIMATION_TYPES.COMPARE,
            indices: [low, mid, high],
            pointers: [
                { index: low, label: 'L', color: 'bg-blue-400' },
                { index: mid, label: 'M', color: 'bg-yellow-400' },
                { index: high, label: 'R', color: 'bg-blue-400' }
            ],
            line: 8
        };

        if (array[mid].value === target) {
            yield {
                type: ANIMATION_TYPES.FOUND,
                indices: [mid],
                pointers: [{ index: mid, label: 'Found', color: 'bg-purple-500' }],
                message: { type: 'success', text: `Element Found at Index ${mid}` },
                line: 12
            };
            return;
        }

        if (array[mid].value < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    // Not found
    yield {
        type: ANIMATION_TYPES.COMPARE,
        indices: [],
        pointers: [],
        message: { type: 'error', text: 'Element Not Found' },
        line: 22
    };
}
