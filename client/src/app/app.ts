import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('client');
  members = signal<any>([]);

  private http = inject(HttpClient);
  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/members/').subscribe({
      next: response => {
        console.log(response);
        this.members.set(response);
      },
      error: err => console.log(err),
      complete: () => console.log('Completed')
    })
  }
}
