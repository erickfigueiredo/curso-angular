import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpHeaders,
  HttpParams,
  HttpEventType,
} from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

import { Post } from "./post.model";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  error = new Subject<string>();
  constructor(private http: HttpClient) {}
  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content };
    this.http
      .post<{ name: string }>(
        "https://ng-complete-guide-c56d3.firebaseio.com/posts.json",
        postData,
        {
          /* observe: 'body' é o padrão */
          observe: "response",
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    /*
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty')
    searchParams = searchParams.append('custom', 'key')
    */
    return (
      this.http
        .get<{ [key: string]: Post }>(
          "https://ng-complete-guide-c56d3.firebaseio.com/posts.json",
          {
            params: new HttpParams().set("print", "pretty"),
          }
        )
        //.pipe(map((responseData: {[key:string]: Post }) => {
        .pipe(
          map((responseData) => {
            const postsArray: Post[] = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key))
                postsArray.push({ ...responseData[key], id: key });
            }

            return postsArray;
          }),
          catchError((errorRes) => {
            // Send to analytics server
            return throwError(errorRes);
          })
        )
    );
  }

  deletePosts() {
    return this.http
      .delete("https://ng-complete-guide-c56d3.firebaseio.com/posts.json", {
        observe: "events",
        responseType: "json", // Padrão
      })
      .pipe(
        tap((event) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log(event);
              break;
            case HttpEventType.Response:
              console.log(event.body);
              break;
            default:
              console.log("Not mapped");
          }
        })
      );
  }
}
