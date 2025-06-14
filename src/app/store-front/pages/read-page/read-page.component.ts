import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ChapterParamsService } from '../../../shared/services/chapterParams.service';
import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-read-page',
  imports: [RouterModule],
  templateUrl: './read-page.component.html',
})

export class ReadPageComponent {
  public activatedRoute = inject(ActivatedRoute);

  constructor(
    public router: Router,
    public chapterParamsService: ChapterParamsService
  ) {}

  public bookId: string = this.activatedRoute.snapshot.params['id'];

  public checkChapterAndImages() {
    if(this.chapterParamsService.chapter == 0) {
      this.router.navigateByUrl("/biblioteca");
    }

    if(this.chapterParamsService.images == 0) {
      this.router.navigateByUrl("/biblioteca");
    }
  }

  public forLoop = Array(this.chapterParamsService.images).fill("dummy");

  public toTop() {
    window.scrollTo(0, 0)
  }

  public alterForLoop(bool: boolean) {
    if(bool) {
      this.chapterParamsService.nextChapter(+this.bookId);
      this.forLoop = Array(this.chapterParamsService.images).fill("dummy")
    } else {
      this.chapterParamsService.previousChapter(+this.bookId);
      this.forLoop = Array(this.chapterParamsService.images).fill("dummy")
    }
  }

  ngOnInit() {
    this.checkChapterAndImages()
  }

}
