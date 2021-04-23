import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})

export class BookDetailsComponent implements OnInit {

  title: string;
  cover: string;
  authors: any;
  description: string;

  constructor(private routing: ActivatedRoute, private singleBook: BookService) { }

  ngOnInit(): void {

    this.routing.paramMap.subscribe(async (paramMap) => {
      const id = paramMap.get('id');
      const book = await this.singleBook.getSingleBook(id);

      this.title = book.title ? book.title : 'No title available';
      this.cover = book.cover ? book.cover : 'No cover available';
      this.authors = book.author ? book.author[0] : 'No author available';
      this.description = book.description.description ? book.description.description.value : 'No synopsis available';

      console.log(book);
    });
  }
}
