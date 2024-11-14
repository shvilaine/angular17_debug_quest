import { ApiService } from './../../services/api.service';
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

  articles$!: Observable<Article[]>;
  private http: HttpClient = inject(HttpClient);
  private apiService: ApiService = inject(ApiService);
  constructor() {
  }

  ngOnInit() {
    this.articles$ = this.apiService.getArticles();
  }

  handleLike(article: Article) {
    article.isLiked = !article.isLiked;
  }
}
