import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewsComponent } from './pages/news/news.component';
import { FormsComponent } from './pages/forms/forms.component';

const routes: Routes = [
  {path:"", pathMatch:'full', redirectTo:"Home"},
  {path:"Home", component:HomeComponent, data:HomeComponent},
  {path:"New/:id", component:NewsComponent, data:NewsComponent},
  {path:"Form", component:FormsComponent, data:FormsComponent},
  {path: '**', redirectTo: '/Home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
