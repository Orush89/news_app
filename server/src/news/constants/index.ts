import { apiKeyNames } from "src/constants";
import { decode_news_url } from "src/deployment/utils/decoding";

const RAW_NEWS_URLS = {
    // "tesla": `https://newsapi.org/v2/everything?q=tesla&from=2025-04-08&apiKey=${apiKeyNames.NEWS_API_KEY}`,
    // "apple": `https://newsapi.org/v2/everything?q=apple&from=2025-05-07&to=2025-05-07&apiKey=${apiKeyNames.NEWS_API_KEY}`,
    "united_stats": `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKeyNames.NEWS_API_KEY}`,
}

export const buildNewFeedUrls = (apiKey: string): string[] => {
    const values = Object.values(RAW_NEWS_URLS).map((url) => {
        return url.replace(/apiKey=[^&]*/, `apiKey=${apiKey}`);
    });

    return values
} 