import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostByCategoryComponent } from './post-by-category.component';

const routes: Routes = [
  {
    path: '',
    component: PostByCategoryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostByCategoryRoutingComponent { }
