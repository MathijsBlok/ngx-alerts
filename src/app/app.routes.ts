import { HomeComponent } from "./pages/home/home.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { RouterModule, Route } from "@angular/router";

const ROUTES: Route[] = [
    {
        path: '',
        component: HomeComponent
    }, {
        path: '**',
        component: PageNotFoundComponent
    }
];
export const AppRouterModule = RouterModule.forRoot(ROUTES);