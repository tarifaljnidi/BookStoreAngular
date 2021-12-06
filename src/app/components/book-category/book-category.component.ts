import { Component, OnInit } from '@angular/core';
import { BookCategory } from '../../common/book-category';
import { BookService } from '../../services/book.service';
import  data from 'src/app/common/dataCategory.json';

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.css']
})
export class BookCategoryComponent implements OnInit {
  bookCategories: BookCategory[];

  constructor(private _bookService: BookService) { }

  ngOnInit() {
     this.bookCategories = data._embedded.bookCateogry;
    this.listBookCategories();
  }

  listBookCategories(){
    this._bookService.getBookCategories().subscribe(
      data => this.bookCategories = data
    );
  }

}
