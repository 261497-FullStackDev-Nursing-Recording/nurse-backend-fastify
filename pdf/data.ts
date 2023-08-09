import { faker } from '@faker-js/faker';

const numParas = [1, 2, 3];
const numNotes = [1, 2, 3, 4, 5];

const texts = [...Array(50).keys()].map((idx) => {
    return faker.lorem.paragraph(getRandomElement(numParas));
});

export const datas = [...Array(10).keys()].map((idx) => {
    return {
        ndx: `NDX-${idx + 1}`,
        notes: {
            sData: getRandomSubArray(texts, getRandomElement(numNotes)),
            oData: getRandomSubArray(texts, getRandomElement(numNotes)),
            iData: getRandomSubArray(texts, getRandomElement(numNotes)),
            eData: getRandomSubArray(texts, getRandomElement(numNotes)),
        },
    };
});

function getRandomElement<T>(array: T[]) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomSubArray<T>(array: T[], num: number) {
    const output = [...Array(3).keys()].map(() => getRandomElement(array));
    return output;
}
