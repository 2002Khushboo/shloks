import { useEffect, useState } from "react"
import { getShloka } from "./services/gitaApi"
import { getDailyVerse } from "./utils/dailyShloka"
import ShlokaCard from "./components/ShlokaCard"

function App() {
  const [shloka, setShloka] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadDailyShloka()
  }, [])

  async function loadDailyShloka() {
    try {
      const { chapter, verse } = await getDailyVerse()

      const data = await getShloka(chapter, verse)

      setShloka(data)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setError("श्लोक लाने में समस्या हुई।")
      setLoading(false)
    }
  }

  async function loadShloka(chapter, verse) {
    try {
      setLoading(true)

      const data = await getShloka(chapter, verse)

      setShloka(data)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setError("श्लोक लाने में समस्या हुई।")
      setLoading(false)
    }
  }

  async function handlePrevious() {
    if (!shloka) {
      return
    }

    if (shloka.verse > 1) {
      await loadShloka(
        shloka.chapter,
        shloka.verse - 1
      )
    }
  }

  async function handleNext() {
    if (!shloka) {
      return
    }

    await loadShloka(
      shloka.chapter,
      shloka.verse + 1
    )
  }

  return (
    <main className="app">

      <header className="header">
        <h1>श्रीमद्भगवद्गीता</h1>
        <p>भगवान श्रीकृष्ण के दिव्य उपदेश</p>
      </header>

      {loading && (
        <p className="loading">
          श्लोक लोड हो रहा है...
        </p>
      )}

      {error && <p>{error}</p>}

      {shloka && (
        <>
          <ShlokaCard shloka={shloka} />

          <div className="shloka-navigation">
            <button
              onClick={handlePrevious}
              disabled={
                shloka.chapter === 1 &&
                shloka.verse === 1
              }
            >
              ← पिछला श्लोक
            </button>

            <button
              onClick={handleNext}
            >
              अगला श्लोक →
            </button>
          </div>
        </>
      )}

    </main>
  )
}

export default App