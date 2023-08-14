import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TemplatesComponent} from "./pages/templates/templates.component";
import {ReactiveComponent} from "./pages/reactive/reactive.component";

const routes: Routes = [
  {path: "template", component: TemplatesComponent},
  {path: "reactive", component: ReactiveComponent},
  {path: "**", pathMatch: "full",redirectTo: "reactive"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
