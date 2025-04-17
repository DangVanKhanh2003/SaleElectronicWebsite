// import { Component, inject, OnInit } from '@angular/core';
// import { Product, ProductImg, Specifiaction } from '../../../core/models/Product';
// import { ProductsService } from '../../../core/services/products.service';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute } from '@angular/router';
// import { ShoppingCartService } from '../../../core/services/shopping-cart.service';
// import { FormsModule } from '@angular/forms';
// import { ToastService } from '../../../core/services/toast.service';

// @Component({
//   selector: 'app-product-detail',
//   standalone: true,
//   imports: [CommonModule, RouterModule, FormsModule ],
//   templateUrl: './product-detail.component.html',
//   styleUrl: './product-detail.component.css'
// })
// export class ProductDetailComponent implements OnInit{
//   route: ActivatedRoute = inject(ActivatedRoute)
//   productId = 0
//   productItem: Product  = {
//       productId: 0,
//       productName: "",
//       brand: "",
//       series: "",
//       price: 1,
//       category: {
//         categoryId: 0,
//         categoryName: "",
//         categoryIcon: "",
//       },
//       mainImg: "",
//       typeImg: "",
//       sale: {
//         saleId: 0,
//         productId: 0,
//         numProduct: 0,
//         startAt: "",
//         endAt: "",
//         percentSale: 0,
//         numProductSold: 0
//       },
//     }
//   ;
//   productSpecification: Specifiaction [] | [] = []; 
//   listProductImg: ProductImg[] | [] = [];
//   selectedImage?: string | null = null;
//   thumbIndex: number = 0;
//   numShoppingCart: number = 1;

//   constructor(private product: ProductsService, private shoppingCart: ShoppingCartService, private toast: ToastService){
//     this.productId = Number(this.route.snapshot.paramMap.get('id'))
    
//   }

//   ngOnInit(): void {
//     this.product.getProductById(this.productId).subscribe(result =>{
//       this.productItem = result
//       this.selectedImage = this.productItem?.mainImg ;
//    })

//    this.product.getSpecificationByProductId(this.productId).subscribe(result =>{
//     this.productSpecification = result;
//    })

//    this.product.getImagesByProductId(this.productId).subscribe(result=>{
//      this.listProductImg = result
//    })
//   }
//   moveThumbnail(direction: number) {
//     const maxIndex = this.listProductImg.length - 7;
//     this.thumbIndex = this.thumbIndex + direction, maxIndex;
//     if(this.thumbIndex > maxIndex)
//     {
//       this.thumbIndex = 0;
//     }

//   }

//   selectImage(img: ProductImg) {
//     this.selectedImage = img.imgLink;
//   }
//   addShoppingCart(itemProduct: Product){
//     this.shoppingCart.addShoppingCartItem({
//         customerId: 1,
//         productId: itemProduct.productId,
//         amount: this.numShoppingCart,
//         colorId: 1
//       }).subscribe(response => {
//         this.toast.showToastSuccess("Thêm sản phẩm vào giỏ hàng thành công!", "Thành công")
//       }, error => {
//         const errorMessage = error?.error?.message || error?.message || 'Đã xảy ra lỗi không xác định';
//         this.toast.showToastError(errorMessage, 'Lỗi');      
//       });
//   }
// }


import { Component, inject, OnInit } from '@angular/core';
import { Product, ProductImg, Specifiaction } from '../../../core/models/Product';
import { ProductsService } from '../../../core/services/products.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../../../core/services/shopping-cart.service';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { ColorResponse } from '../../../core/models/Color';
import { error } from 'node:console';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  productId = 0;
  productItem: Product = {
    productId: 0,
    productName: "",
    brand: "",
    series: "",
    price: 1,
    category: {
      categoryId: 0,
      categoryName: "",
      categoryIcon: "",
    },
    mainImg: "",
    typeImg: "",
    sale: {
      saleId: 0,
      productId: 0,
      numProduct: 0,
      startAt: "",
      endAt: "",
      percentSale: 0,
      numProductSold: 0
    },
  };
  productSpecification: Specifiaction[] | [] = [];
  listProductImg: ProductImg[] | [] = [];
  selectedImage: string | null = null;
  thumbIndex: number = 0;
  numShoppingCart: number = 1;
  selectedColor: any = null; // For color selection
  colors: ColorResponse[] |[ ] = []
  colorIdActive: number = -1;
  // Sample related products (you can fetch this from an API if needed)
  relatedProducts: any[] = [
    { name: 'Bộ sạc MagSafe Apple kèm cáp USB-C chính hãng - MX2E2VN/A', price: 1150000, originalPrice: 1300000, discount: 11, img: '/api/placeholder/200/180' },
    { name: 'Đế sạc Apple MagSafe MHXH3 | Chính hãng Apple Việt Nam', price: 1150000, originalPrice: 1300000, discount: 11, img: '/api/placeholder/200/180' },
    { name: 'Ốp lưng iPhone 15e Apple silicone with magsafe', price: 1199000, img: '/api/placeholder/200/180' },
    { name: 'Sạc MagSafe Duo Apple chính hãng', price: 2450000, originalPrice: 2890000, discount: 15, img: '/api/placeholder/200/180' },
    { name: 'Bộ sạc đa năng MagSafe 3 in 1 cho iPhone/Watch/AirPods', price: 1690000, img: '/api/placeholder/200/180' }
  ];

  // Sample reviews (you can fetch this from an API if needed)
  reviews: any[] = [
    {
      reviewerName: 'Thế Anh',
      rating: 5,
      performance: 'Siêu mạnh mẽ',
      batteryLife: 'Cực khủng',
      cameraQuality: 'Chụp đẹp, chuyên nghiệp',
      comment: 'Sản phẩm tốt, dịch vụ vui tốt',
      timestamp: '8/4/2025 19:48'
    }
  ];

  constructor(
    private productService: ProductsService,
    private shoppingCart: ShoppingCartService,
    private toast: ToastService
  ) {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.productService.getProductById(this.productId).subscribe(result => {
      this.productItem = result;
      this.selectedImage = this.productItem?.mainImg;
    });
    this.getColorByIdProduct();
    this.productService.getSpecificationByProductId(this.productId).subscribe(result => {
      this.productSpecification = result;
    });

    this.productService.getImagesByProductId(this.productId).subscribe(result => {
      this.listProductImg = result;
    });

  }

  moveThumbnail(direction: number) {
    const maxIndex = this.listProductImg.length - 7;
    this.thumbIndex = Math.max(0, Math.min(this.thumbIndex + direction, maxIndex));
  }

  selectImage(img: ProductImg) {
    this.selectedImage = img.imgLink;
  }

  selectColor(color: ColorResponse) {
    this.colorIdActive = color.colorId
  }

  getColorByIdProduct(){

      this.productService.getColorByIdProduct(this.productId).subscribe({
        next: (response) =>{
          this.colors = response
        },
        error: (error) =>{
          const errorMessage = error?.error?.message || error?.message || 'Đã xảy ra lỗi không xác định';
          this.toast.showToastError(errorMessage, 'Lỗi');
        }
      })
    
  }
  addShoppingCart(itemProduct: Product, useDefaultColor: boolean = false) {
    if(useDefaultColor && this.colorIdActive == -1)
    {
      this.colorIdActive = this.colors[0].colorId
    }

    if(this.colorIdActive == -1 )
    {
      this.toast.showToastWarning("Hãy chọn màu sắc trước khi đặt hàng", "Thông báo!");
      return;
    }

      this.shoppingCart.addShoppingCartItem({
        customerId: 1,
        productId: itemProduct.productId,
        amount: this.numShoppingCart,
        colorId: this.colorIdActive
      }).subscribe(
        response => {
          this.toast.showToastSuccess("Thêm sản phẩm vào giỏ hàng thành công!", "Thành công");
        },
        error => {
          const errorMessage = error?.error?.message || error?.message || 'Đã xảy ra lỗi không xác định';
          this.toast.showToastError(errorMessage, 'Lỗi');
        }
      );
    }
    
}