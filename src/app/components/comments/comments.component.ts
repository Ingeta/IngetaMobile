import { Component, OnInit, Input } from '@angular/core';
import { WordpressService } from './../../services/wordpress.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {

    @Input() postId: any;
    comments: any = [];

    constructor(
        private wp: WordpressService,
        private router: Router
    ) { }
    ngOnInit() {
        this.getComments();
    }
    async getComments() {
        this.wp.getComments(this.postId, 5).subscribe(res => {
            this.comments = res;
        });
    }
    gotoCommentsPage() {
        this.router.navigate(['/tabs/comments', this.postId]);
    }
    gotoCommentDetails(id) {
        this.router.navigate(['/tabs/comment-details', id]);
    }
}
