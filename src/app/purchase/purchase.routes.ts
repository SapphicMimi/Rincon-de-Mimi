import { Routes } from "@angular/router";
import { PurchaseLayoutComponent } from "./layout/purchase-layout/purchase-layout.component";
import { PurchasePageComponent } from "./pages/purchase-page/purchase-page.component";
import { NotFoundPurchasePageComponent } from "./pages/not-found-purchase-page/not-found-purchase-page.component";

export const purchaseRoutes: Routes = [
  {
    path: '',
    component: PurchaseLayoutComponent,
    children: [
      {
        path: ':idBook',
        component: PurchasePageComponent
      },
      {
        path: '**',
        component: NotFoundPurchasePageComponent
      }
    ]
  }
]

export default purchaseRoutes;
