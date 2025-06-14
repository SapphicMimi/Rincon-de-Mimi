import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JikanClient, JikanResponse, Manga } from '@tutkli/jikan-ts';
import { Review } from '../../shared/interfaces/reviews';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MangaService {

  public apiUrl: string = "https://api.jikan.moe/v4/manga/";

  constructor(
    private httpClient: HttpClient
  ) {}



  public async getManga(id: number): Promise<Manga> {
    const jikanClient = new JikanClient();

    return jikanClient.manga
      .getMangaById(id)
      .then((response: JikanResponse<Manga>) => {
        return response.data
      })
  }

  public getReviews(id: number) {
    return this.httpClient.get<Review>(this.apiUrl+id+"/reviews");
  }
}
