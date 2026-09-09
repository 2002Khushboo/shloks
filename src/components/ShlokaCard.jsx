import { formatSanskrit,formatMeaning } from "../utils/textFormatter"
import CommentaryPage from "./CommentaryPage"

function ShlokaCard({ shloka }) {
  return (
    <section className="book">
        <div className="book-page left-page">
            <div className="page-content">
                <div className="chapter-info">
                    अध्याय {shloka.chapter} • श्लोक {shloka.verse}
                </div>

                <div className="sanskrit">
                    {formatSanskrit(shloka.slok)}
                </div>
            </div>
        </div>

        <div className="book-page right-page">
            <div className="page-content">
                <div className="meaning">
                    <h3>हिंदी अर्थ</h3>
                    <p>{formatMeaning(shloka.rams?.ht)}</p>
                </div>

                <CommentaryPage commentary={formatMeaning(shloka.rams?.hc)} />
            </div>
        </div>
    </section>
  )
}

export default ShlokaCard