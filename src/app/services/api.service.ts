import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private _ARTICLE_DB = 'http://localhost:3000/articles';
  articles!: Article[];

  constructor(private http: HttpClient) {
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this._ARTICLE_DB);
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this._ARTICLE_DB}/${id}`);
  }
}
