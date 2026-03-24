from newspaper import Article


def extract_article_text(url: str) -> str:
    article = Article(url)

    try:
        article.download()
        article.parse()
    except Exception as exc:
        raise ValueError("Unable to extract article content.") from exc

    text = article.text

    if not text or len(text) < 100:
        raise ValueError("Article text too short or extraction failed.")

    return text