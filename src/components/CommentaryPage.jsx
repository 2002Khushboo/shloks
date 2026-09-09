import { useEffect, useRef, useState } from "react"

function CommentaryPage({ commentary }) {
  const [pages, setPages] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

  const measureRef = useRef(null)

  useEffect(() => {
    if (!commentary || !measureRef.current) {
      setPages([])
      return
    }

    const container = measureRef.current
    /*const availableHeight = 200

    if (!container) {
      return
    }*/

    const words = commentary.trim().split(/\s+/)
    const newPages = []

    let currentText = ""

    for (const word of words) {
      const testText = currentText
        ? `${currentText} ${word}`
        : word

      container.textContent = testText

      /*if (container.scrollHeight > container.offsetHeight) {
        if (currentText) {
          newPages.push(currentText)
          currentText = word
        } else {
          currentText = word
        }
      } else {
        currentText = testText
      }*/
      if (container.scrollHeight > container.offsetHeight) {
        newPages.push(currentText)
        currentText = word
      } else {
        currentText = testText
      }
    }

    if (currentText) {
      newPages.push(currentText)
    }

    setPages(newPages)
    setCurrentPage(0)
  }, [commentary])

  if (!commentary) {
    return null
  }

  return (
    <>
    <div className="commentary-section">
        <h3>
          भावार्थ
          {pages.length > 1 &&
            ` — पृष्ठ ${currentPage + 1} / ${pages.length}`}
        </h3>

        <div className="commentary-text">
          <p>{pages[currentPage] || "भावार्थ लोड हो रहा है..."}</p>
          <div
                ref={measureRef}
                className="commentary-measure"
            />
        </div>

        {pages.length > 1 && (
          <div className="commentary-navigation">
            <button
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(page - 1, 0)
                )
              }
              disabled={currentPage === 0}
            >
              ← पिछला पृष्ठ
            </button>

            <button
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(page + 1, pages.length - 1)
                )
              }
              disabled={
                currentPage === pages.length - 1
              }
            >
              अगला पृष्ठ →
            </button>
          </div>
        )}
    </div>
    </>
  )
}

export default CommentaryPage