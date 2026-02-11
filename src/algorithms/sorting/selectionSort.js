import { ANIMATION_TYPES } from '../../utils/constants';

export function* selectionSort(array) {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        let minIdx = i;

        for (let j = i + 1; j < n; j++) {
            yield {
                type: ANIMATION_TYPES.COMPARE,
                indices: [minIdx, j]
            };

            if (arr[j].value < arr[minIdx].value) {
                minIdx = j;
            }
        }

        if (minIdx !== i) {
            let temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;

            yield {
                type: ANIMATION_TYPES.SWAP,
                indices: [i, minIdx]
            };
        }

        yield {
            type: ANIMATION_TYPES.SORTED,
            indices: [i]
        };
    }
}
