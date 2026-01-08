import getWordCount from './getWordCount'

export default function getReadingDuration(
  markdown: string,
  wordsPerMinute: number = 200
) {
  const words = getWordCount(markdown)
  return Math.ceil(words / wordsPerMinute)
}
