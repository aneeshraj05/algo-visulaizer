import { ANIMATION_TYPES } from '../../utils/constants';

export function* binarySearch(array, target) {
    let low = 0;
    let high = array.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        yield {
            type: ANIMATION_TYPES.COMPARE,
            indices: [mid, low, high] // Highlight range? Or just mid
        };

        if (array[mid].value === target) {
            yield {
                type: ANIMATION_TYPES.FOUND,
                indices: [mid]
            };
            return;
        }

        if (array[mid].value < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
}
