import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/layout/footer/footer.component";
import { HeaderComponent } from "./shared/layout/header/header.component";
import { MenuSearchComponent } from "./shared/layout/menu-search/menu-search.component";
import { HomeComponent } from './admin/pages/home/home.component';
import { Route } from '@angular/router';
import { ToastComponent } from "./shared/layout/toast/toast.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, HeaderComponent, MenuSearchComponent, HomeComponent, RouterModule, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DoAnProjectFrontend';
}
