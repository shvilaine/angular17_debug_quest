import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from '../../models/article.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.scss'
})

export class ArticlePageComponent {

  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  articleId!: number;
  article!: Article;

  ARTICLE_DB = 'http://localhost:3000/articles';

  getArticleById(id: number) {
    this.http.get<Article>(`${this.ARTICLE_DB}/${id}`).subscribe({
      next: (data) => {this.article = data},
      error: (error) => {console.error('Erreur: ', error);}
  });
}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.articleId = Number(params.get('id'));
    });
    this.getArticleById(this.articleId);
  }

  handleLike(article: Article) {
    article.isLiked = !article.isLiked;
  }
}
