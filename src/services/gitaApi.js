const API_BASE_URL = "https://vedicscriptures.github.io"

export async function getShloka(chapter, verse) {
  const response = await fetch(
    `${API_BASE_URL}/slok/${chapter}/${verse}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch shloka")
  }

  return response.json()
}
export async function getChapters() {
  const response = await fetch(
    `${API_BASE_URL}/chapters`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch chapters")
  }

  return response.json()
}