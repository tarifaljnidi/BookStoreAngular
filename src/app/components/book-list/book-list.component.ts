import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import  data from 'src/app/common/data.json';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  currentCategoryId: number;
  searchMode: boolean = false;
   previousCategoryId: number = 1;
  //new properties for server-side paging
currentPage: number = 1;
pageSize: number = 12;
totalRecords: number = 0;


constructor(private _bookService: BookService,
            private _activatedRoute: ActivatedRoute,
             private _cartService: CartService,
            config: NgbPaginationConfig) {
              config.boundaryLinks = true;
              config.maxSize = 3;
            }

  ngOnInit(): void {
     this.books =data._embedded.books;
    this._activatedRoute.paramMap.subscribe(()=>{
      this.listBooks();
    })
  }

  listBooks(){
    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');

      if(this.searchMode){
        //do search work
        this.handleSearchBooks();
      }else {
        //display books based on category
        this.handleListBooks();
      }

  }

  handleListBooks(){
    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      const param=this._activatedRoute.snapshot.paramMap.get('id');
       this.currentCategoryId = param?+param:0;
    //  this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
       }else {
         this.currentCategoryId = 1;
       }

       //setting up the page number to 1
          //if user navigates to other category
          if (this.previousCategoryId != this.currentCategoryId) {
            this.currentPage = 1;
          }

          this.previousCategoryId = this.currentCategoryId;

    this._bookService.getBooks(this.currentCategoryId,
                                     this.currentPage - 1,
                                     this.pageSize)
                                     .subscribe( data => {

                                       this.books = data._embedded.books;
                                       this.currentPage = data.page.number + 1;
                                       this.totalRecords = data.page.totalElements;
                                       this.pageSize = data.page.size;
                                     } );
}



handleSearchBooks(){
   const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword')!;
   this._bookService.searchBooks(keyword, this.currentPage - 1,this.pageSize).subscribe( data => {
       this.books = data._embedded.books;
       this.currentPage = data.page.number + 1;
       this.totalRecords = data.page.totalElements;
       this.pageSize = data.page.size;
     } );
 }

 //client side paging and server side paging
 updatePageSize(pageSize: number) {
   this.pageSize = pageSize;
   this.currentPage = 1;
   this.listBooks();
 }

 addToCart(book: Book){
  //  console.log(`book name: ${book.name}, and price: ${book.unitPrice}`);
    const cartItem = new CartItem(book);
    this._cartService.addToCart(cartItem);
  }
 }
