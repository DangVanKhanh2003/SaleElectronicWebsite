import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/layout/header/header.component";
import { Route } from '@angular/router';
import { NavComponent } from "./shared/layout/nav/nav.component";

import { ProductDiscountListComponent } from "./admin/pages/discount/product-discount-list/product-discount-list.component";
import { CategoryListComponent } from './admin/pages/category/category-list/category-list.component';
import { AddCategoryModalComponent } from './admin/pages/category/add-category/add-category.component';
import { EditCategoryModalComponent } from './admin/pages/category/edit-category/edit-category.component';
import { DeleteCategoryModalComponent } from './admin/pages/category/delete-category/delete-category.component';
import { AddDiscountModalComponent } from "./admin/pages/discount/add-discount-modal/add-discount-modal.component";
import { EditDiscountModalComponent } from "./admin/pages/discount/edit-discount-modal/edit-discount-modal.component";
import { ProductListComponent } from "./admin/pages/product/product-list/product-list.component";
import { ProductModalComponent } from "./admin/pages/product/product-modal/product-modal.component";
import { ProductDetailsComponent } from "./admin/pages/product/product-details/product-details.component";
import { OrderListComponent } from "./admin/pages/order/order-list/order-list.component";
import { OrderDetailsModalComponent } from "./admin/pages/order/order-details-modal/order-details-modal.component";
import { ToastComponent } from "./shared/layout/toast/toast.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, RouterModule, NavComponent,
    CategoryListComponent, AddCategoryModalComponent, EditCategoryModalComponent,
    DeleteCategoryModalComponent, ProductDiscountListComponent, AddDiscountModalComponent,
    EditDiscountModalComponent, ProductListComponent, ProductModalComponent, ProductDetailsComponent,
    OrderListComponent, OrderDetailsModalComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'DoAnProjectFrontend';
}
