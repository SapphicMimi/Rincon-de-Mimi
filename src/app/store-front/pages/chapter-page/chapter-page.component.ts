import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ChapterParamsService } from '../../../shared/services/chapterParams.service';
import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-chapter-page',
  imports: [RouterModule],
  templateUrl: './chapter-page.component.html',
})

export class ChapterPageComponent {
  public activatedRoute = inject(ActivatedRoute);

  constructor(
    public router: Router,
    public chapterParamsService: ChapterParamsService,
    public libraryService: LibraryService
  ) {}

  public bookId: string = this.activatedRoute.snapshot.params['id'];

  public forLoop = Array(this.chapterParamsService.allChapters).fill("dummy");

  public checkEnter(): void {
    if(!this.chapterParamsService.enter) {
      this.router.navigateByUrl("/biblioteca");
    }

    if(this.chapterParamsService.allChapters == 0) {
      this.router.navigateByUrl("/biblioteca");
    }
  }

  ngOnInit() {
    this.checkEnter();
  }
}
