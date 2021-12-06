import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';
import { BookCategory } from '../common/book-category';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = "http://springbootbookstore-env.eba-3vmyfg5p.us-east-2.elasticbeanstalk.com/api/v1/books";
  private categoryUrl = "http://springbootbookstore-env.eba-3vmyfg5p.us-east-2.elasticbeanstalk.com/api/v1/book-category";

  constructor(private httpClient: HttpClient) { }


  getBooks(theCategoryId: number, currentPage: number, pageSize: number): Observable<GetResponseBooks>{
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl);
  }

  getBookCategories(): Observable<BookCategory[]>{
  return this.httpClient.get<GetResponseBookCategory>(this.categoryUrl).pipe(
    map(response => response._embedded.bookCateogry)
  );
}
private getBooksList(searchUrl: string): Observable<Book[]> {
  return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
    map(response => response._embedded.books)
  );
}

//
// searchBooks(keyword: string): Observable<Book[]>{
//   const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}`;
//   return this.getBooksList(searchUrl);
// //  return this.httpClient.get<GetResponseBooks>(searchUrl);
// }
searchBooks(keyword: string, currentPage: number, pageSize: number): Observable<GetResponseBooks>{
  const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}&page=${currentPage}&size=${pageSize}`;
  return this.httpClient.get<GetResponseBooks>(searchUrl);
}

get(bookId: number): Observable<Book> {
  const bookDetailsUrl = `${this.baseUrl}/${bookId}`;
  return this.httpClient.get<Book>(bookDetailsUrl);
}




}


interface GetResponseBooks{
  _embedded: {
    books: Book[];
  },
  page: {
    //cureent page
    size: number,
    //total number of records in database
    totalElements: number,
    //total number of pages, starts from 0 index
    totalPages: number,
    //current page
    number: number
  }
}
interface GetResponseBookCategory{
_embedded: {
  bookCateogry: BookCategory[];
}
}
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { Book } from '../common/book';
//
//
// @Injectable({
//   providedIn: 'root'
// })
// export class BookService {
//
//   private baseUrl = "http://localhost:8080/api/v1/books";
//   private categoryUrl = "http://localhost:8080/api/v1/book-category";
//
//   constructor(private httpClient: HttpClient) { }
//
//    getBooks(): Observable<Book[]> {
//     return this.httpClient.get<GetResponseBooks>(this.baseUrl).pipe(
//       map(response => response._embedded.books)
//     );
//   }
//
// }
//
// interface GetResponseBooks{
//   _embedded: {
//     books: Book[];
//   }
// }
//
