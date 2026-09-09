import { useEffect, useState } from "react"
import { getShloka } from "./services/gitaApi"
import { getDailyVerse } from "./utils/dailyShloka"
import ShlokaCard from "./components/ShlokaCard"

function App() {
  const [shloka, setShloka] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getDailyVerse()
      .then(({ chapter, verse }) => {
        return getShloka(chapter, verse)
      })
      .then((data) => {
        setShloka(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setError("श्लोक लाने में समस्या हुई।")
        setLoading(false)
      })
  }, [])

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

      {shloka && <ShlokaCard shloka={shloka} />}
    </main>
  )
}

export default App