import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../pages/search/search.module').then(m => m.SearchModule)
      },
      {
        path: 'save',
        loadChildren: () => import('../pages/save/save.module').then(m => m.SaveModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('../pages/categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'posts/:category',
        loadChildren: () => import('../pages/post-by-category/post-by-category.module').then(m => m.PostByCategoryModule)
      },
      {
        path: 'posts',
        loadChildren: () => import('../pages/posts/posts.module').then(m => m.PostsModule)
      },
      {
        path: 'comments/:postId',
        loadChildren: () => import('../pages/comments/comments.module').then(m => m.CommentsModule)
      },
      {
        path: 'comment-details/:commentId',
        loadChildren: () => import('../pages/comment-details/comment-details.module').then(m => m.CommentDetailsModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
