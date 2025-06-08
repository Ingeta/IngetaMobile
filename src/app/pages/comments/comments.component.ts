import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WordpressService } from './../../services/wordpress.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {

  comments: any = [];
  postId: any;
  page = 1;
  count = null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private wp: WordpressService) { }

  ngOnInit() {
    // Get Slug URL
    this.route.params.subscribe(params => {
      this.postId = params['postId'];
      this.getComments();
    });
  }

  async getComments() {
    this.wp.getComments(this.postId, 20, this.page).subscribe(res => {
      this.comments = res;
    });
  }

  loadMore(event) {
    this.page++;

    this.wp.getComments(this.postId, 10, this.page).subscribe(res => {
      this.comments = [...this.comments, ...res];
      event.target.complete();

      // Disable infinite loading when maximum reached
      if (this.page == this.wp.pages) {
        event.target.disabled = true;
      }
    });
  }

  gotoCommentDetails(id) {
    this.router.navigate(['/tabs/comment-details', id]);
  }
}
