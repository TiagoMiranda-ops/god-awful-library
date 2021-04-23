import { Injectable } from '@angular/core';
import { Book } from './types';
import { title } from 'process';

interface ApiBookResponse {
  docs: BookContent[];
}

interface BookContent {
  id: string;
  title: string;
  author_name: string[];
  cover_edition_key: string;
  description?: string;
}

interface ShowBook {
  details: BookContentDetails;
}

interface BookContentDetails {
  authors?: any
  cover: string;
  title: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  async getAllBooks(): Promise<Book[]> {
    const bookListResponse = await fetch('http://gnm-book-class.herokuapp.com/search?author=tolkien');
    const bookList = (await bookListResponse.json()) as ApiBookResponse;
    return bookList.docs.map((content) => {
      return {
        id: content.id,
        title: content.title,
        author: content.author_name.join(),
        cover: content.cover_edition_key,
        description: content.description,
      };
    });
  }

  async getSingleBook(id: Book['id']): Promise<Book> {
    const bookListResponse = await fetch(`http://gnm-book-class.herokuapp.com/books?id=${id}&format=json&jscmd=details`);
    const bookContent = (await bookListResponse.json()) as ShowBook;
    console.log(bookContent);
    return {
      id: id,
      title: bookContent.details.title,
      author: bookContent.details.authors,
      cover: bookContent.details.cover,
      description: bookContent.details
    }
  }
}




