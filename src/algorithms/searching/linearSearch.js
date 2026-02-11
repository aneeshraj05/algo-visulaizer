import { ANIMATION_TYPES } from '../../utils/constants';

export function* linearSearch(array, target) {
    const arr = array; // Array of objects { value, id }

    for (let i = 0; i < arr.length; i++) {
        yield {
            type: ANIMATION_TYPES.COMPARE,
            indices: [i]
        };

        if (arr[i].value === target) {
            yield {
                type: ANIMATION_TYPES.FOUND,
                indices: [i]
            };
            return;
        }
    }
}
