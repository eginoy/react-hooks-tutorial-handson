import {BookDescription} from './BookDescription';

export function buildSearchUrl(title: string, author: string, maxResults: number): string {
    let url = "https://www.googleapis.com/books/v1/volumes?q=";
    const conditions: string[] = []
    if (title) {
      conditions.push(`intitle:${title}`);
    }
    if (author) {
      conditions.push(`inauthor:${author}`);
    }
    return url + conditions.join('+') + `&maxResults=${maxResults}`;
  }
  
export function extractBooks(json: any): BookDescription[] {
    const items: any[] = json.items;
    return items.map((item: any) => {
      const volumeInfo: any = item.volumeInfo;
      return {
        title: volumeInfo.title,
        authors: volumeInfo.authors ? volumeInfo.authors.join(', ') : "",
        thumbnail: volumeInfo.imageLinks ? volumeInfo.imageLinks.smallThumbnail : "",
      }
    });
  }