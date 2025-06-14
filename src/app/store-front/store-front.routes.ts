import { Routes } from "@angular/router";
import { StoreFrontLayoutComponent } from "./layout/store-front-layout/store-front-layout.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { BookPageComponent } from "./pages/book-page/book-page.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { SuscriptionPageComponent } from "./pages/suscription-page/suscription-page.component";
import { MangaPageComponent } from "./pages/manga-page/manga-page.component";
import { OrderPageComponent } from "./pages/order-page/order-page.component";
import { authenticatedGuard } from "../purchase/guards/authenticated.guard";
import { LibraryPageComponent } from "./pages/library-page/library-page.component";
import { ChapterPageComponent } from "./pages/chapter-page/chapter-page.component";
import { ReadPageComponent } from "./pages/read-page/read-page.component";
import { UserAndAdminGuard } from "./guards/UserAndAdmin.guard";
import { AdminPageComponent } from "./pages/admin-page/admin-page.component";
import { AdminGuard } from "./guards/Admin.guard";

export const storeFrontRoutes: Routes = [
    {
        path: '',
        component: StoreFrontLayoutComponent,
        children: [
          {
            path: '',
            component: HomePageComponent
          },
          {
            path: 'manga/:id',
            component: BookPageComponent
          },
          {
            path: 'suscription',
            component: SuscriptionPageComponent
          },
          {
            path: 'manga',
            component: MangaPageComponent
          },
          {
            path: 'pedidos',
            component: OrderPageComponent,
            canMatch: [
              authenticatedGuard
            ]
          },
          {
            path: 'biblioteca',
            component: LibraryPageComponent,
            canMatch: [
              UserAndAdminGuard
            ]
          },
          {
            path: 'biblioteca/:id',
            component: ChapterPageComponent,
            canMatch: [
              UserAndAdminGuard
            ]
          },
          {
            path: 'biblioteca/leer/:id',
            component: ReadPageComponent,
            canMatch: [
              UserAndAdminGuard
            ]
          },
          {
            path: 'admin',
            component: AdminPageComponent,
            canMatch: [
              AdminGuard
            ]
          },
          /**
          {
            path: '**',
            component: NotFoundPageComponent
          },
          */
          {
            path: '**',
            redirectTo: ''
          }

        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

export default storeFrontRoutes;
