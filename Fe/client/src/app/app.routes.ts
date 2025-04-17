import { Routes } from '@angular/router';
import { HomeComponent } from './admin/pages/home/home.component';
import { ProductsComponent } from './admin/pages/products/products.component';
import { ProductDetailComponent } from './admin/pages/product-detail/product-detail.component';
import { ShoppingCartComponent } from './admin/pages/shopping-cart/shopping-cart.component';
import { OrderHistoryComponent } from './admin/pages/order-history/order-history.component';
import { DetailOrderComponent } from './admin/pages/detail-order/detail-order.component';
import { DetailOrderPendingComponent } from './admin/pages/detail-order-pending/detail-order-pending.component';

export const routesConfig: Routes = [
    {
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full'
    },
    {
        path: 'home',
        component:  HomeComponent,
        title: 'Home page'
    },
    {
        path: 'products',
        component: ProductsComponent,
        title: 'Products'
    },
    {
        path: 'products/:id',
        component: ProductsComponent,
        title: 'Products'
    },
    {
        path: 'productDetails/:id',
        component: ProductDetailComponent,
        title: 'productDetails'
    },
    {
        path: 'shoppingCart',
        component: ShoppingCartComponent,
        title: 'shoppingCart'
    },
    {
        path: 'orderHistory',
        component: OrderHistoryComponent,
        title: 'orderHistory'
    },
    {
        path: 'orderDetail/:id',
        component: DetailOrderComponent,
        title: 'DetailOrder'
    },
    {
        path: 'orderPendingDetail/:id',
        component: DetailOrderPendingComponent,
        title: 'DetailOrderPending'
    },
];
