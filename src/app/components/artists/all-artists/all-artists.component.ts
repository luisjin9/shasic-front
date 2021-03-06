import { Component, OnInit } from '@angular/core';
import { Artist } from '../../../models/Artist';
import { SharedService } from '../../../services/shared.service';
import { ArtistService } from '../../../services/artist.service';
import { ShasicUtils } from '../../../helpers/ShasicUtils';

@Component({
  selector: 'app-all-artists',
  templateUrl: './all-artists.component.html',
  styleUrls: ['./all-artists.component.css'],
})
export class AllArtistsComponent implements OnInit {
  artists: Artist[] = [];
  setArtistImg = ShasicUtils.setArtistImg;
  constructor(
    private sharedService: SharedService,
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
    this.getAllArtists();
  }

  getAllArtists() {
    this.sharedService.runSpinner(true);
    this.artistService.getAllArtists().subscribe({
      next: (response) => {
        this.artists = response.sort(
          (objA: any, objB: any) => objB.followers - objA.followers
        );
      },
      complete: () => {
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        this.sharedService.runSpinner(false);
        this.sharedService.showError(6000);
      },
    });
  }

  followArtist(id: number) {
    this.sharedService.runSpinner(true);
    document.getElementById('followButton' + id)!.innerHTML = '· · ·';
    this.artistService.followArtist(id).subscribe({
      next: (response) => {
        this.getAllArtists();
      },
      complete: () => {
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        this.sharedService.runSpinner(false);
        this.sharedService.showError(6000);
      },
    });
  }

  unfollowArtist(id: number) {
    this.sharedService.runSpinner(true);
    document.getElementById('followButton' + id)!.innerHTML = '· · ·';
    this.artistService.unfollowArtist(id).subscribe({
      next: (response) => {
        this.getAllArtists();
      },
      complete: () => {
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        this.sharedService.runSpinner(false);
        this.sharedService.showError(6000);
      },
    });
  }
}
