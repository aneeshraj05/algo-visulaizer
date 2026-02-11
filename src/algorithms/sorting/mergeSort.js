import { ANIMATION_TYPES } from '../../utils/constants';

export function* mergeSort(array) {
    const arr = array.map(item => item.value); // Just Values for simpler logic
    // We need to yield steps with original objects or just values?
    // Context expects values for Overwrite. `item.value` in array. 
    // Wait, array objects have { value, id }.
    // Overwrite in context: `newArr[index] = { ...newArr[index], value: step.value };`
    // So we pass the numeric value.

    yield* mergeSortHelper(arr, 0, arr.length - 1, array);
}

function* mergeSortHelper(mainArray, startIdx, endIdx, originalArrayObjs) {
    if (startIdx === endIdx) return;

    const middleIdx = Math.floor((startIdx + endIdx) / 2);

    yield* mergeSortHelper(mainArray, startIdx, middleIdx, originalArrayObjs);
    yield* mergeSortHelper(mainArray, middleIdx + 1, endIdx, originalArrayObjs);

    yield* doMerge(mainArray, startIdx, middleIdx, endIdx);
}

function* doMerge(mainArray, startIdx, middleIdx, endIdx) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;

    const auxiliaryArray = mainArray.slice();

    while (i <= middleIdx && j <= endIdx) {
        yield {
            type: ANIMATION_TYPES.COMPARE,
            indices: [i, j]
        };

        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            yield {
                type: ANIMATION_TYPES.OVERWRITE,
                indices: [k],
                value: auxiliaryArray[i]
            };
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            yield {
                type: ANIMATION_TYPES.OVERWRITE,
                indices: [k],
                value: auxiliaryArray[j]
            };
            mainArray[k++] = auxiliaryArray[j++];
        }
    }

    while (i <= middleIdx) {
        yield {
            type: ANIMATION_TYPES.COMPARE,
            indices: [i, i] // Dummy comparison
        };
        yield {
            type: ANIMATION_TYPES.OVERWRITE,
            indices: [k],
            value: auxiliaryArray[i]
        };
        mainArray[k++] = auxiliaryArray[i++];
    }

    while (j <= endIdx) {
        yield {
            type: ANIMATION_TYPES.COMPARE,
            indices: [j, j]
        };
        yield {
            type: ANIMATION_TYPES.OVERWRITE,
            indices: [k],
            value: auxiliaryArray[j]
        };
        mainArray[k++] = auxiliaryArray[j++];
    }
}
