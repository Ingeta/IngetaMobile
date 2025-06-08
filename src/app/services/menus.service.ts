import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MenusService {

    constructor() { }

    getPages() {
        return [
            {
                title: 'Acceuil',
                url: '/tabs/home',
                icon: 'home'
            },
            {
                title: 'Categories',
                url: '/tabs/categories',
                icon: 'reorder-four'
            },
            {
                title: 'Articles',
                url: '/tabs/posts',
                icon: 'apps'
            },
            {
                title: 'Recherche',
                url: '/tabs/search',
                icon: 'search'
            },
            {
                title: 'Articles sauvegardés',
                url: '/tabs/save',
                icon: 'bookmark'
            }
        ];
    }
}
