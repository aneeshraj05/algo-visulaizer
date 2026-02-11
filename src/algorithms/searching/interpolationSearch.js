import { ANIMATION_TYPES } from '../../utils/constants';

export function* interpolationSearch(array, target) {
    let low = 0;
    let high = array.length - 1;

    while (low <= high && target >= array[low].value && target <= array[high].value) {
        if (low === high) {
            yield { type: ANIMATION_TYPES.COMPARE, indices: [low] };
            if (array[low].value === target) {
                yield { type: ANIMATION_TYPES.FOUND, indices: [low] };
            }
            return;
        }

        // Estimate position
        const pos = low + Math.floor(
            ((target - array[low].value) * (high - low)) /
            (array[high].value - array[low].value)
        );

        yield {
            type: ANIMATION_TYPES.COMPARE,
            indices: [pos]
        };

        if (array[pos].value === target) {
            yield { type: ANIMATION_TYPES.FOUND, indices: [pos] };
            return;
        }

        if (array[pos].value < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }
}
