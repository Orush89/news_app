
export const NEWS_API_KEY = process.env.NEWS_API_KEY;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const decode_news_url = (url: string) => {
    return url.replace(/apiKey=[^&]*/, `apiKey=${NEWS_API_KEY}`);
}

export const decode_open_ai_url = (url: string) => {
    return url.replace(/API_KEY=[^&]*/, `API_KEY=${OPENAI_API_KEY}`);
}