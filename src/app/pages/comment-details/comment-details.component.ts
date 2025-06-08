import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WordpressService } from './../../services/wordpress.service';


@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.scss'],
})
export class CommentDetailsComponent implements OnInit {

  commentId: any;
  commentDetails: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private wp: WordpressService) { }

  ngOnInit() {
    // Get Slug URL
    this.route.params.subscribe(params => {
      this.commentId = params['commentId'];
      this.getCommentDetails();
    });
  }

  getCommentDetails() {
    this.wp.getCommentDetailsById(this.commentId).subscribe(res => {
      this.commentDetails = res;
    })
  }

  gotoPostPage() {
    this.router.navigate(['/post-details', this.commentDetails.post]);
  }
}
