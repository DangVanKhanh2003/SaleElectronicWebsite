import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../core/services/products.service';
import { Product, ProductImg, SpecifiactionResponse } from '../../../../core/models/Product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  specifications: SpecifiactionResponse[] = [];
  productImages: ProductImg[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (productId) {
      this.loadProduct(productId);
      this.loadSpecifications(productId);
      this.loadProductImages(productId);
    }
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.productsService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load product';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadSpecifications(id: number): void {
    this.productsService.getSpecificationByProductId(id).subscribe({
      next: (specs) => {
        this.specifications = specs;
      },
      error: (err) => {
        this.error = 'Failed to load specifications';
        console.error(err);
      }
    });
  }

  loadProductImages(id: number): void {
    this.productsService.getImagesByProductId(id).subscribe({
      next: (images) => {
        this.productImages = images;
      },
      error: (err) => {
        this.error = 'Failed to load product images';
        console.error(err);
      }
    });
  }
}