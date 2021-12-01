import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book = new Book();

  constructor(private _activatedRoute: ActivatedRoute,
              private _bookService: BookService,
                private _cartService: CartService
            ) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(
      () => {
        this.getBookInfo();
      }
    )
  }

  getBookInfo(){
    const param=this._activatedRoute.snapshot.paramMap.get('id');
    const id: number = param?+param:0;

    this._bookService.get(id).subscribe(
      data => {
        this.book = data;
      }
    );
  }

  addToCart(){
    // console.log(`book name: ${this.book.name}, and price: ${this.book.unitPrice}`);
    const cartItem = new CartItem(this.book);
    this._cartService.addToCart(cartItem);
  }

}
