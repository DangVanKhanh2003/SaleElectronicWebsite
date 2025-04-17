import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product, ProductImg, productRequest, SpecificationRequest, SpecifiactionResponse } from '../../../../core/models/Product';
import { CategoryResponse } from '../../../../core/models/Categories';
import { ProductsService } from '../../../../core/services/products.service';
import { ConvertImgUtils } from '../../../../core/utils/ConvertImgUtils';
import { response } from 'express';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {
  @Input() modalType: 'add' | 'edit' | 'delete' = 'add';
  @Input() selectedProduct: Product | null = null;
  @Input() categories: CategoryResponse[] = [];
  @Input() isVisible: boolean = true; 

  @Output() productSaved = new EventEmitter<{productRequest: productRequest, id: number, listSpecification: SpecificationRequest[]}>();
  @Output() productDeleted = new EventEmitter<number>();
  @Output() closed = new EventEmitter<void>();

  productForm: FormGroup;
  specifications: SpecifiactionResponse[] = [];
  productRequest: productRequest;
  loading = false;
  error: string | null = null;
  selectedImageBase64: string | null = null;
  categoryIdChoosed: number = 0;
  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private toast: ToastService,
  ) {
    this.productForm = this.fb.group({
      productId: [null],
      productName: ['', Validators.required],
      brand: ['', Validators.required],
      series: ['', Validators.required],
      categoryId: [null, Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      percentSale: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      startAt: [''],
      endAt: [''],
      numProduct: [0, [Validators.required, Validators.min(0)]],
      numProductSold: [0, [Validators.required, Validators.min(0)]],
      mainImg: '',
      typeMainImg: '',
      subImages: this.fb.array([]),
      specifications: this.fb.array([]),
    });

    this.productRequest = {
        productName: '',
        brand: '',
        series: '',
        price: 0,
        categoryId: 0,
        mainImg: '',
        typeImg: ''
      };
  }

  get Specifications() {
    return this.productForm.get('specifications') as FormArray;
  }

  get subImages(): FormArray {
    return this.productForm.get('subImages') as FormArray;
  }
  get mainImg(){
    return this.productForm.get('mainImg') as FormArray;
  }
  ngOnInit(): void {
    if( this.modalType == "add")
    {
      this.Specifications.push(this.fb.group({
        specType: ['', Validators.required],
        description: ['', Validators.required],
        productId: [this.productForm.get('productId')?.value || 0]
      }));
    }
    if (this.selectedProduct) {
      this.productForm.patchValue(this.selectedProduct);
      this.categoryIdChoosed = this.selectedProduct.category.categoryId;
      this.loadSpecifications();
      this.loadProductImages();
    }

    if (this.modalType === 'add') {
      this.productForm.get('numProductSold')?.disable();
    }
  }

  changeProduct()
  {
    
  }
  close(): void {
    this.closed.emit();
  }
  

  loadProductImages(): void {
    const productId = this.productForm.get('productId')?.value;
    if (productId) {
      this.loading = true;
      this.productsService.getImagesByProductId(productId).subscribe({
        next: (images) => {
          images.forEach(img => {
            this.subImages.push(this.fb.group({
              imgData: [img.imgLink],
              imgColor: [img.colorId]
            }));
          });          
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load product images';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }

  saveProduct(): void {
    if (this.productForm.invalid) return;
    const product: productRequest = this.productForm.value as productRequest;
    const idProduct = this.selectedProduct?.productId ?? 0
    const SpeRequestList: SpecificationRequest[] = this.specifications.map(spec => ({
      specType: spec.specType,
      description: spec.description,
      productId: spec.productId
    }));
    this.productSaved.emit({productRequest: product, id: idProduct, listSpecification: SpeRequestList});
    this.closed.emit();
  }

  deleteProduct(): void {
    const id = this.productForm.get('productId')?.value;
    if (id) {
      this.productDeleted.emit(id);
    }
    this.closed.emit();
  }

  onSubImagesSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (!files) return;
  
    Array.from(files).forEach(file => {
      ConvertImgUtils.toBase64WithType(file).then(result => {
        // Push both base64 and type as a form group
        this.subImages.push(this.fb.group({
          imgData: result.base64,
          imgType: result.type
        }));
      }).catch(err => {
        console.error('Failed to convert image:', err);
      });
    });
  }

  onImageSelected(event: Event, controlPrefix: 'mainImg' | 'typeImg') {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      ConvertImgUtils.toBase64WithType(file).then(result => {
        this.productForm.patchValue({
          mainImg: result.base64,
          typeMainImg: result.type
        });
      }).catch(error => {
        console.error('Image convert failed:', error);
      });
    }
  }


  addSpecification() {
    this.Specifications.push(this.fb.group({
      specType: ['', Validators.required],
      description: ['', Validators.required],
      productId: [this.productForm.get('productId')?.value || 0]
    }));
  }
  
  

  removeSpecification(index: number) {
    this.Specifications.removeAt(index);
  }


  loadSpecifications(): void {
    const productId = this.productForm.get('productId')?.value;
    if (productId) {
      this.loading = true;
      this.productsService.getSpecificationByProductId(productId).subscribe({
        next: (specs: SpecifiactionResponse[]) => {
          const specsFormArray = this.Specifications;
          while (specsFormArray.length) {
            specsFormArray.removeAt(0);
          }
  
          specs.forEach((spec: SpecifiactionResponse) => {
            specsFormArray.push(this.fb.group({
              specifiactionsId: [spec.specifiactionsId],
              specType: [spec.specType, Validators.required],
              description: [spec.description, Validators.required],
              productId: [spec.productId]
            }));
          });
  
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load specifications';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }
  
}
