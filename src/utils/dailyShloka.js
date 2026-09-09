import { getChapters } from "../services/gitaApi"

const START_DATE = new Date("2026-09-09")

const START_CHAPTER = 8
const START_VERSE = 15

export async function getDailyVerse() {
  const chapters = await getChapters()

  const totalVerses = chapters.reduce(
    (total, chapter) => total + chapter.verses_count,
    0
  )

  const startVerseNumber = getGlobalVerseNumber(
    chapters,
    START_CHAPTER,
    START_VERSE
  )

  const today = new Date()

  START_DATE.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  const differenceInDays = Math.floor(
    (today - START_DATE) / (1000 * 60 * 60 * 24)
  )

  const dailyVerseNumber =
    ((startVerseNumber - 1 + differenceInDays) % totalVerses + totalVerses) %
      totalVerses +
    1

  return getChapterAndVerse(chapters, dailyVerseNumber)
}

function getGlobalVerseNumber(chapters, chapterNumber, verseNumber) {
  let total = 0

  for (const chapter of chapters) {
    if (chapter.chapter_number === chapterNumber) {
      return total + verseNumber
    }

    total += chapter.verses_count
  }

  return 1
}

function getChapterAndVerse(chapters, verseNumber) {
  let remaining = verseNumber

  for (const chapter of chapters) {
    if (remaining <= chapter.verses_count) {
      return {
        chapter: chapter.chapter_number,
        verse: remaining
      }
    }

    remaining -= chapter.verses_count
  }

  return {
    chapter: 1,
    verse: 1
  }
}