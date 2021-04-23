import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

interface Link {
  text: string;
  url: string;
}

@Component({
  selector: 'app-side-bar-container',
  templateUrl: './side-bar-container.component.html',
  styleUrls: ['./side-bar-container.component.css']
})

export class SideBarContainerComponent implements OnInit {
  
  links: Link[];

  constructor(private bookService: BookService) { }

  async ngOnInit(): Promise<void> {
    const books = await this.bookService.getAllBooks();
    console.log(books);

    this.links = books.map((book) => {
      return {
        text: book.title,
        url: '/book/' + book.id,
      };
    });
  }
}
