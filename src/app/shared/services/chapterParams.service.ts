import { Injectable } from '@angular/core';
import { LibraryService } from '../../store-front/services/library.service';

@Injectable({
  providedIn: 'root'
})
export class ChapterParamsService {

  constructor(
    public libraryService: LibraryService
  ) {}

  public chapter: number = 0;
  public images: number = 0;

  public enter: boolean = false;
  public allChapters: number = 0;

  public setChapterAndImages(chapter: number, images: number): void {
    this.chapter = chapter;
    this.images = images;
  }

  public setEnter(bool: boolean , chapters: number): void {
    this.enter = bool;
    this.allChapters = chapters;
  }

  public nextChapter(id: number): void{
    this.chapter++;
    this.setChapterAndImages(this.chapter, this.libraryService.getImages(id, this.chapter))
  }

  public previousChapter(id: number): void {
    this.chapter--;
    this.setChapterAndImages(this.chapter, this.libraryService.getImages(id, this.chapter))
  }
}
