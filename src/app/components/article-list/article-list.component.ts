import { Component, inject, Injectable } from '@angular/core';
import { Article } from '../../models/article.model';
import { ArticleThumbnailComponent } from '../article-thumbnail/article-thumbnail.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, ArticleThumbnailComponent, HttpClientModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
})

@Injectable({providedIn: 'root'})
export class ArticleListComponent {
  ARTICLE_DB = 'http://localhost:3000/articles';
  articles!: Article[];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getArticles();
  }

  getArticles(): void {
    this.http.get<Article[]>(this.ARTICLE_DB)
    .subscribe((articles: Article[]) => this.articles = articles
    );
  }

  handleLike(article: Article) {
    article.isLiked = !article.isLiked;
  }
}
