import { ApiService } from './../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from '../../models/article.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.scss'
})

export class ArticlePageComponent implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute);
  private apiService: ApiService = inject(ApiService);
  articleId!: number;
  article$!: Observable<Article>;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.articleId = Number(params.get('id'));
    });
    this.article$ = this.apiService.getArticleById(this.articleId);
  }

  handleLike(article: Article) {
    article.isLiked = !article.isLiked;
  }
}
