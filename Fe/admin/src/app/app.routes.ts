import { Routes } from '@angular/router';
import { ProductListComponent } from './admin/pages/product/product-list/product-list.component';
import { CategoryListComponent } from './admin/pages/category/category-list/category-list.component';
import { OrderListComponent } from './admin/pages/order/order-list/order-list.component';
import { ProductDiscountListComponent } from './admin/pages/discount/product-discount-list/product-discount-list.component';


export const routesConfig: Routes = [
    {
        path: '', 
        redirectTo: 'hoproductme', 
        pathMatch: 'full'
    },
    {
        path: 'product',
        component:  ProductListComponent,
        title: 'product page'
    },
    {
        path: 'category',
        component:  CategoryListComponent,
        title: 'cateagory page'
    },
    {
        path: 'order',
        component:  OrderListComponent,
        title: 'order page'
    },
    {
        path: 'discount',
        component:  ProductDiscountListComponent,
        title: 'discout page'
    },

];
