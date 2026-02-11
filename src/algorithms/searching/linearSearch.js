import { ANIMATION_TYPES } from "../../utils/constants";

export function* linearSearch(array, target) {
    for (let i = 0; i < array.length; i++) {
        // Compare with pointer
        yield {
            type: ANIMATION_TYPES.COMPARE,
            indices: [i],
            pointers: [{ index: i, label: 'i', color: 'bg-yellow-400' }],
            line: 3
        };

        if (array[i].value === target) {
            yield {
                type: ANIMATION_TYPES.FOUND,
                indices: [i],
                pointers: [{ index: i, label: 'Found', color: 'bg-purple-500' }],
                message: { type: 'success', text: `Element Found at Index ${i}` },
                line: 4
            };
            return;
        }
    }

    // Not found
    yield {
        type: ANIMATION_TYPES.COMPARE,
        indices: [],
        pointers: [],
        message: { type: 'error', text: 'Element Not Found' },
        line: 8
    };
}
