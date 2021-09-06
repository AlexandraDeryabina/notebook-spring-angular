import {RegistryComponent} from "./registry/registry.component";
import {CardComponent} from "./card/card.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {path:'', component: RegistryComponent},
  {path:'CARD/:action/:id', component: CardComponent},
  {path:'CARD/:action', component: CardComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
