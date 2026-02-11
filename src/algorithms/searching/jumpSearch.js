import { ANIMATION_TYPES } from '../../utils/constants';

export function* jumpSearch(array, target) {
    const n = array.length;
    let step = Math.floor(Math.sqrt(n));
    let prev = 0;

    // Jump
    while (array[Math.min(step, n) - 1].value < target) {
        yield {
            type: ANIMATION_TYPES.COMPARE,
            indices: [Math.min(step, n) - 1]
        };

        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) return;
    }

    // Linear search in block
    while (array[prev].value < target) {
        yield {
            type: ANIMATION_TYPES.COMPARE,
            indices: [prev]
        };
        prev++;
        if (prev === Math.min(step, n)) return;
    }

    yield {
        type: ANIMATION_TYPES.COMPARE,
        indices: [prev]
    };

    if (array[prev].value === target) {
        yield {
            type: ANIMATION_TYPES.FOUND,
            indices: [prev]
        };
    }
}
