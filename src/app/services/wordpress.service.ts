import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WordpressService {

    totalPosts = null;
    totalCategories = null;
    pages: any;

    constructor(
        private http: HttpClient,
        private configService: ConfigService
    ) { }

    // Get website information
    getWebsiteInfo() {
        return this.http.get(`${this.configService.CONFIG.URL}`).pipe(
            tap(data => {
                    return data;
                },
                error => console.log(error))
        );
    }

    // Get Posts
    getPosts(page = 1): Observable<any[]> {
        const options = {
            observe: 'response' as 'body',
            params: {
                per_page: '10',
                page: '' + page
            }
        };

        return this.http.get<any[]>(`${this.configService.CONFIG.URL}/wp/v2/posts?_embed`, options).pipe(
            map(resp => {
                this.pages = resp['headers'].get('x-wp-totalpages');
                this.totalPosts = resp['headers'].get('x-wp-total');

                const data = resp['body'];

                for (const post of data) {
                    if (post['_embedded']['wp:featuredmedia']) {
                        post.media_url = post['_embedded']['wp:featuredmedia']['0'].source_url;
                        post.author_name = post['_embedded']['author'][0].name;
                    }
                }
                return data;
            })
        );
    }

    // Get Latest Post
    getLatestPost(page = 1): Observable<any[]> {
        const options = {
            observe: 'response' as 'body',
            params: {
                per_page: '10',
                page: '' + page
            }
        };

        return this.http.get<any[]>(`${this.configService.CONFIG.URL}/wp/v2/posts?_embed&order=desc`, options).pipe(
            map(resp => {
                this.pages = resp['headers'].get('x-wp-totalpages');
                this.totalPosts = resp['headers'].get('x-wp-total');

                const data = resp['body'];

                for (const post of data) {
                    if (post['_embedded'] && post['_embedded']['wp:featuredmedia']) {
                        post.media_url = post['_embedded']['wp:featuredmedia']['0'].source_url;
                    }
                }
                return data;
            })
        );
    }

    // Get Posts By Category
    getPostByCategory(categoryId, page = 1): Observable<any[]> {
        const options = {
            observe: 'response' as 'body',
            params: {
                per_page: '10',
                page: '' + page
            }
        };

        return this.http.get<any[]>(`${this.configService.CONFIG.URL}/wp/v2/posts?categories=${categoryId}`, options).pipe(
            map(resp => {
                this.pages = resp['headers'].get('x-wp-totalpages');
                this.totalPosts = resp['headers'].get('x-wp-total');

                const data = resp['body'];

                for (const post of data) {

                    // Get Feature Image
                    this.getMediaById(post.featured_media).subscribe((response) => {
                        post.feature_img = response['guid']['rendered'];
                    });

                    // Get Authors Details
                    this.getAuthorById(post.author).subscribe((response) => {
                        post.author_name = response['name'];
                    });

                    if (post['_embedded'] && post['_embedded']['wp:featuredmedia']) {
                        post.media_url = post['_embedded']['wp:featuredmedia']['0'].source_url;
                    }
                }

                return data;
            })
        );
    }

    // Get Post Details By Post Id
    getPostDetailsById(id): Observable<any> {
        return this.http.get(`${this.configService.CONFIG.URL}/wp/v2/posts/${id}?_embed`).pipe(
            tap(data => {
                    if (data['_embedded'] && data['_embedded']['wp:featuredmedia']) {
                        data.media_url = data['_embedded']['wp:featuredmedia']['0'].source_url;
                        data.author_name = data['_embedded']['author'][0].name;
                    }

                    return data;
                },
                error => console.log(error))
        );
    }

    // Get Search Results
    getSearchResult(txt, page = 1): Observable<any> {
        const options = {
            observe: 'response' as 'body',
            params: {
                per_page: '10',
                page: '' + page
            }
        };

        return this.http.get<any[]>(`${this.configService.CONFIG.URL}/wp/v2/posts?search=${txt}`, options).pipe(
            map(resp => {
                this.pages = resp['headers'].get('x-wp-totalpages');
                this.totalPosts = resp['headers'].get('x-wp-total');

                const data = resp['body'];

                for (const post of data) {
                    // Get Feature Image
                    this.getMediaById(post.featured_media).subscribe((response) => {
                        post.feature_img = response['guid']['rendered'];
                    });
                }
                return data;
            })
        );
    }

    // Get Categories
    getCategories(page = 1): Observable<any[]> {
        const options = {
            observe: 'response' as 'body',
            params: {
                per_page: '20',
                page: '' + page
            }
        };

        return this.http
            .get<any[]>(`${this.configService.CONFIG.URL}/wp/v2/categories?_embed`, options)
            .pipe(
                map(resp => {
                    this.pages = resp['headers'].get('x-wp-totalpages');
                    this.totalCategories = resp['headers'].get('x-wp-total');

                    const data = resp['body'];

                    // Your 12-color palette
                    const baseColors = [
                        // Blues
                        '#0080ff', // original
                        '#005bb5', // darker blue
                        '#3399ff', // lighter blue
                        // Reds
                        '#ED2625', // original
                        '#a00d11', // darker red
                        '#ff4b4b', // lighter red
                        // Golds/Oranges
                        '#DB9835', // original
                        '#ffd27f', // lighter gold
                        '#b37424', // darker gold
                        // Grays
                        '#1D2021', // original (very dark)
                        '#D9D9D9', // original (very light gray)
                        '#999999'  // medium gray
                    ];

                    // Pre-generate a random sequence of 12 picks from baseColors
                    const randomPalette = Array.from({ length: 12 }, () => {
                        return baseColors[Math.floor(Math.random() * baseColors.length)];
                    });

                    // Assign colors to each category, cycling through randomPalette
                    data.forEach((category, idx) => {
                        category.color = randomPalette[idx % randomPalette.length];
                    });

                    return data;
                })
            );
    }

    // Get Comments
    getComments(postId, perPage, page = 1): Observable<any> {
        const options = {
            observe: 'response' as 'body',
            params: {
                per_page: perPage,
                page: '' + page
            }
        };

        return this.http.get<any[]>(`${this.configService.CONFIG.URL}/wp/v2/comments?post=${postId}`, options).pipe(
            map(resp => {
                const data = resp['body'];
                return data;
            })
        )
    }

    // Get Comment Details By Comment Id
    getCommentDetailsById(id): Observable<any> {
        return this.http.get(`${this.configService.CONFIG.URL}/wp/v2/comments/${id}`).pipe(
            tap(data => {
                    return data
                },
                error => console.log(error))
        )
    }

    // Get Media By Media Id
    getMediaById(id): Observable<any> {
        return this.http.get(`${this.configService.CONFIG.URL}/wp/v2/media/${id}`)
    }

    // Get Author Details by Author Id
    getAuthorById(id): Observable<any> {
        return this.http.get(`${this.configService.CONFIG.URL}/wp/v2/users/${id}`);
    }

    // Get Category By Category Id
    getCategoryByCategoryId(id): Observable<any> {
        return this.http.get(`${this.configService.CONFIG.URL}/wp/v2/categories/${id}`);
    }
}
