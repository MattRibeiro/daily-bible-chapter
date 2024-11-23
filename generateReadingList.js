const otBooks = [
{ book: "Genesis", min: 0, max: 49 },
{ book: "Exodus", min: 50, max: 89 },
{ book: "Leviticus", min: 90, max: 116 },
{ book: "Numbers", min: 117, max: 152 },
{ book: "Deuteronomy", min: 153, max: 186 },
{ book: "Joshua", min: 187, max: 210 },
{ book: "Judges", min: 211, max: 231 },
{ book: "Ruth", min: 232, max: 235 },
{ book: "1 Samuel", min: 236, max: 266 },
{ book: "2 Samuel", min: 267, max: 290 },
{ book: "1 Kings", min: 291, max: 312 },
{ book: "2 Kings", min: 313, max: 337 },
{ book: "1 Chronicles", min: 338, max: 366 },
{ book: "2 Chronicles", min: 367, max: 402 },
{ book: "Ezra", min: 403, max: 412 },
{ book: "Nehemiah", min: 413, max: 425 },
{ book: "Esther", min: 426, max: 435 },
{ book: "Job", min: 436, max: 477 },
{ book: "Psalms", min: 478, max: 627 },
{ book: "Proverbs", min: 628, max: 658 },
{ book: "Ecclesiastes", min: 659, max: 670 },
{ book: "Song of Solomon", min: 671, max: 678 },
{ book: "Isaiah", min: 679, max: 744 },
{ book: "Jeremiah", min: 745, max: 796 },
{ book: "Lamentations", min: 797, max: 801 },
{ book: "Ezekiel", min: 802, max: 849 },
{ book: "Daniel", min: 850, max: 861 },
{ book: "Hosea", min: 862, max: 875 },
{ book: "Joel", min: 876, max: 878 },
{ book: "Amos", min: 879, max: 887 },
{ book: "Obadiah", min: 888, max: 888 },
{ book: "Jonah", min: 889, max: 892 },
{ book: "Micah", min: 893, max: 899 },
{ book: "Nahum", min: 900, max: 902 },
{ book: "Habakkuk", min: 903, max: 905 },
{ book: "Zephaniah", min: 906, max: 908 },
{ book: "Haggai", min: 909, max: 910 },
{ book: "Zechariah", min: 911, max: 924 },
{ book: "Malachi", min: 925, max: 928 },
];

const ntNarratives = [
{ book: "Matthew",min: 0, max: 27 },
{ book: "Mark",min: 28, max: 43 },
{ book: "Luke",min: 44, max: 67 },
{ book: "John",min: 68, max: 88 },
{ book: "Acts",min: 89, max: 116 },
];

const ntWritings = [
{ book: "Romans",min: 0, max: 15 },
{ book: "1 Corinthians",min: 16, max: 31 },
{ book: "2 Corinthians",min: 32, max: 44 },
{ book: "Galatians",min: 45, max: 50 },
{ book: "Ephesians",min: 51, max: 56 },
{ book: "Philippians",min: 57, max: 60 },
{ book: "Colossians",min: 61, max: 64 },
{ book: "1 Thessalonians",min: 65, max: 69 },
{ book: "2 Thessalonians",min: 70, max: 72 },
{ book: "1 Timothy",min: 73, max: 78 },
{ book: "2 Timothy",min: 79, max: 82 },
{ book: "Titus",min: 83, max: 85 },
{ book: "Philemon",min: 86, max: 86 },
{ book: "Hebrews",min: 87, max: 99 },
{ book: "James",min: 100, max: 104 },
{ book: "1 Peter",min: 105, max: 109 },
{ book: "2 Peter",min: 110, max: 112 },
{ book: "1 John",min: 113, max: 117 },
{ book: "2 John",min: 118, max: 118 },
{ book: "3 John",min: 119, max: 119 },
{ book: "Jude",min: 120, max: 120 },
{ book: "Revelation",min: 121, max: 142 },
];

const totalChapters = 1189;

// function that takes a day [0, 1189) returns reading number (e.g. [0, 89)
function dayNumberToReadingNumber(dayNumber, maxDays, bookList) {
    if (dayNumber < 0) {
        return -dayNumber; // special case, to force negative days to have values different than positive days
    }

    // get number of readings, which is the max for the last book in the book list
    const numberOfReadings = bookList[bookList.length - 1].max;
    const day = dayNumber % maxDays; // day is [0, 1189)
    const readingPerDay = numberOfReadings / maxDays;
    return Math.round(day * readingPerDay);
}

// function that takes a reading number and returns the book and chapter
function readingNumberToBookAndChapter(readingNumber, bookList) {
    const book = bookList.find(book => readingNumber >= book.min && readingNumber <= book.max);
    if (book === undefined) {
        throw new Error("Invalid reading number");
    }
    const chapter = readingNumber - book.min + 1; // chapter is 1-indexed
    return { book: book.book, chapter: chapter };
}

/*
console.log(dayNumberToReadingNumber(0, totalChapters, otBooks));
console.log(dayNumberToReadingNumber(totalChapters - 1, totalChapters, otBooks));

console.log(readingNumberToBookAndChapter(dayNumberToReadingNumber(0, totalChapters, otBooks), otBooks));
console.log(readingNumberToBookAndChapter(dayNumberToReadingNumber(totalChapters - 1, totalChapters, otBooks), otBooks));

console.log(dayNumberToReadingNumber(0, totalChapters, ntNarratives));
console.log(dayNumberToReadingNumber(totalChapters - 1, totalChapters, ntNarratives));

console.log(readingNumberToBookAndChapter(dayNumberToReadingNumber(0, totalChapters, ntNarratives), ntNarratives));
console.log(readingNumberToBookAndChapter(dayNumberToReadingNumber(totalChapters - 1, totalChapters, ntNarratives), ntNarratives));

console.log(dayNumberToReadingNumber(0, totalChapters, ntWritings));
console.log(dayNumberToReadingNumber(totalChapters - 1, totalChapters, ntWritings));

console.log(readingNumberToBookAndChapter(dayNumberToReadingNumber(0, totalChapters, ntWritings), ntWritings));
console.log(readingNumberToBookAndChapter(dayNumberToReadingNumber(totalChapters - 1, totalChapters, ntWritings), ntWritings));
*/

// console.log(getReadingOfTheDay(0, totalChapters, [ntNarratives, ntWritings, otBooks]));
// console.log(getReadingOfTheDay(totalChapters - 1, totalChapters, [ntNarratives, ntWritings, otBooks]));

const completeReadingList = [];

var ntNarrativesLastReading = -1;
var ntWritingsLastReading = -1;
var otBooksLastReading = -1;

for (var day = 0; day < totalChapters; day++) {

    if (dayNumberToReadingNumber(day, totalChapters, ntNarratives) > ntNarrativesLastReading) {
        ntNarrativesLastReading++;
        completeReadingList.push(readingNumberToBookAndChapter(ntNarrativesLastReading, ntNarratives));
    }

    if (dayNumberToReadingNumber(day, totalChapters, ntWritings) > ntWritingsLastReading) {
        ntWritingsLastReading++;
        completeReadingList.push(readingNumberToBookAndChapter(ntWritingsLastReading, ntWritings));
    }

    if (dayNumberToReadingNumber(day, totalChapters, otBooks) > otBooksLastReading) {
        otBooksLastReading++;
        completeReadingList.push(readingNumberToBookAndChapter(otBooksLastReading, otBooks));
    }
}

completeReadingList.push(readingNumberToBookAndChapter(++otBooksLastReading, otBooks));

for (var i = 0; i < completeReadingList.length; i++) {
    console.log(`{ book: "${completeReadingList[i].book}", chapter: ${completeReadingList[i].chapter} },`);
}
