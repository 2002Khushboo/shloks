export function formatSanskrit(text) {
  if (!text) {
    return ""
  }

  let formatted = text

  // Remove chapter/verse marker such as ||६-१९||
  formatted = formatted.replace(/\|\|[^|]*\|\|/g, "")

  // Replace the single pipe separating the two lines
  formatted = formatted.replace(/\|/g, "\n")

  // Convert double danda spacing to proper Sanskrit punctuation
  formatted = formatted
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n")

  return formatted
}

export function formatMeaning(text) {
  if (!text) {
    return ""
  }

  return text
    .replace(/।।\s*\d+\.\d+\s*।।/g, "")
    .trim()
}