﻿using AutoMapper;
using Azure.Core;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using SellingElectronicWebsite.Entities;
using SellingElectronicWebsite.Helper;
using SellingElectronicWebsite.Model;
using SellingElectronicWebsite.ViewModel;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Runtime.Intrinsics.X86;

namespace SellingElectronicWebsite.Repository
{
    public class ProductsRepository : IProductsRepository
    {
        private SellingElectronicsContext _context;
        private static SellingElectronicsContext _staticContext = new SellingElectronicsContext();
        private readonly IMapper _mapper;
        private static IDbContextFactory<SellingElectronicsContext> _contextFactory;


        public ProductsRepository(SellingElectronicsContext context, IMapper mapper, IDbContextFactory<SellingElectronicsContext> contextFactory)
        {
            _contextFactory = contextFactory;
            _context = context;
            _mapper = mapper;

        }
        public async static Task<Sale> checkSaleByIdProduct(int idProduct, DateTime time)
        {
            using var context = _contextFactory.CreateDbContext();

            var sale = await context.Sales.Where(s => s.ProductId == idProduct && time <= s.EndAt && time >= s.StartAt).FirstOrDefaultAsync();
            return sale;
        }
        public async Task<bool> CategoryExists(int? categoryId)
        {
            if (categoryId == null) return false;

            return await _context.Categories.AnyAsync(c => c.CategoryId == categoryId);
        }

        public async Task<Product> Add(ProductModel model)
        {
            Product p = _mapper.Map<Product>(model);
            await _context.Products.AddAsync(p);
            return p;
        }

        public async Task<bool> Delete(int id)
        {
            //check product at store
            List<int> stores = await _context.StoresProducts
                                                        .Where(p => p.ProductId == id && p.Amount > 0)
                                                        .Select(p => p.StoreId)
                                                        .ToListAsync();
            if(stores.Count() > 0)
            {
                string listIdStroreStr = String.Join(",", stores);
                throw new Exception("Can not delete product because The product exist at stores by id store: " + listIdStroreStr);
            }

            var p = await _context.Products.Where(p => p.ProductId == id).FirstOrDefaultAsync();
            if (p == null)
            {
                return false;
            }
            _context.Products.Remove(p);


            return true;
        }

        public async Task<List<ProductVM>> GetAll(string sortBy)
        {
            var list = await _context.Products
                    .Include(p => p.Category)
                    .ToListAsync();
            var products = _mapper.Map<List<ProductVM>>(list);

            foreach (var item in products)
            {
                SalesVM sale = _mapper.Map<SalesVM>(await checkSaleByIdProduct(item.ProductId, DateTime.Now));
                if (sale != null)
                {
                    item.sale = sale;
                }
            }
            var queryableProduct = products.AsQueryable();

            if (!string.IsNullOrEmpty(sortBy))
            {
                switch (sortBy)
                {
                    case "name_desc": products = products.OrderByDescending(p => p.ProductName).ToList(); break;
                    case "name_asc": products = products.OrderByDescending(p => p.ProductName).ToList(); break;
                    case "price_asc": products = products.OrderBy(p => p.Price).ToList(); break;
                    case "price_desc": products = products.OrderByDescending(p => p.Price).ToList(); break;
                }
            }
            return products;
        }

        public async Task<List<ProductVM>> GetProductByIdCategory(int idCategroy, string sortBy)
        {
            var list = await _context.Products
                    .Include(p => p.Category)
                    .Where(p => p.CategoryId == idCategroy)
                    .ToListAsync();
            var products = _mapper.Map<List<ProductVM>>(list);

            foreach (var item in products)
            {
                SalesVM sale = _mapper.Map<SalesVM>(await checkSaleByIdProduct(item.ProductId, DateTime.Now));
                if (sale != null)
                {
                    item.sale = sale;
                }
            }
            var queryableProduct = products.AsQueryable();

            if (!string.IsNullOrEmpty(sortBy))
            {
                switch (sortBy)
                {
                    case "name_desc": products = products.OrderByDescending(p => p.ProductName).ToList(); break;
                    case "name_asc": products = products.OrderByDescending(p => p.ProductName).ToList(); break;
                    case "price_asc": products = products.OrderBy(p => p.Price).ToList(); break;
                    case "price_desc": products = products.OrderByDescending(p => p.Price).ToList(); break;
                }
            }
            return products;
        }

        public async Task<List<ProductVM>> GetProductHaveDiscount()
        {
            var list = await _context.Products
                    .ToListAsync();
            var products = _mapper.Map<List<ProductVM>>(list);

            foreach (var item in products)
            {
                SalesVM sale = _mapper.Map<SalesVM>(await checkSaleByIdProduct(item.ProductId, DateTime.Now));
                if (sale != null)
                {
                    item.sale = sale;
                }
                else
                {
                    item.sale = null;
                }
                    
            }
            
            return products.Where(p => p.sale != null).ToList();
        }

        public async Task<List<ProductVM>> GetByPage(int pageIndex, int pageSize, string sortBy)
        {
            var list = await _context.Products
                    .Include(p => p.Category)
                    
                    .ToListAsync();
            var products = _mapper.Map<List<ProductVM>>(list);

            foreach (var item in products)
            {
                SalesVM sale = _mapper.Map<SalesVM>(await checkSaleByIdProduct(item.ProductId, DateTime.Now));
                if (sale != null)
                {
                    item.sale = sale;
                }
            }
            if (!string.IsNullOrEmpty(sortBy))
            {
                switch (sortBy)
                {
                    case "name_desc": products = products.OrderByDescending(p => p.ProductName).ToList(); break;
                    case "name_asc": products = products.OrderByDescending(p => p.ProductName).ToList(); break;
                    case "price_asc": products = products.OrderBy(p => p.Price).ToList(); break;
                    case "price_desc": products = products.OrderByDescending(p => p.Price).ToList(); break;
                }
            }
            var queryableProduct = products.AsQueryable();

            var items = PaginatedList<ProductVM>.create(queryableProduct, pageIndex, pageSize);

            return items;
        }

        public async Task<ProductVM> GetById(int id)
        {
            var item = await _context.Products.Include(p => p.Category) // Include the category navigation property
                                                .Where(p => p.ProductId == id)                                         
                                                .FirstOrDefaultAsync();
            var model = _mapper.Map<ProductVM>(item);

            SalesVM sale = _mapper.Map<SalesVM>(await checkSaleByIdProduct(model.ProductId, DateTime.Now));
            if (sale != null)
            {
                model.sale = sale;
            }


            return model;
        }
        public async Task<ProductVM> GetByName(String name)
        {
            var item = await _context.Products.Where(p => p.ProductName.Equals(name))
                                                .FirstOrDefaultAsync();
            var model = _mapper.Map<ProductVM>(item);
            if (model == null)
            {
                return model;
            }
            SalesVM sale = _mapper.Map<SalesVM>(await checkSaleByIdProduct(model.ProductId, DateTime.Now));
            if (sale != null)
            {
                model.sale = sale;
            }
            return model;
        }

        public async Task<bool> Update(ProductModel model, int id)
        {

            var p = await _context.Products.Where(p => p.ProductId.Equals(id)).FirstOrDefaultAsync();
            if (p == null)
            {
                return false;
            }
            _mapper.Map(model, p);

            _context.Products.Update(p);


            return true;

        }
        public async Task<int> CountProducts()
        {
            var p = await _context.Products.CountAsync();
            return p;
        }

        public async Task<List<ColorVM>> GetAllColor(int id)
        {
            var Colors = await _context.ImageProducts.Include(p => p.Color)
                                                          .Where(p => p.ProductId == id)
                                                          .Select(p => new ColorVM(p.ColorId ?? 0, p.Color.ColorName, p.Color.ColorCode)).Distinct().ToListAsync();
            return Colors;
        }

        public async Task<List<ImageProductsVM>> GetImgByIdProduct(int idProduct)
        {
            var imgs = await _context.ImageProducts.Include(p => p.Color)
                                                    .Where(p => p.ProductId == idProduct).ToListAsync();
            var imgsVM = _mapper.Map<List<ImageProductsVM>>(imgs);
            return imgsVM;
        }

        public async Task<bool> AddImgs(List<ImageProductsModel> models)
        {
            var items = _mapper.Map<List<ImageProduct>>(models);
            foreach (var img in items)
            {
                await _context.AddAsync(img);
            }
            return true;
        }

        public async Task<bool> UpdateImgs(List<ImageProductsModel> models, int idProduct)
        {
            await DeleteAllImgByIdProduct(idProduct);
            await AddImgs(models);
            return true;

        }

        public async Task<bool> DeleteImgByIdImg(int idImg)
        {
            var img = await _context.ImageProducts.Where(i => i.ImgId == idImg).FirstOrDefaultAsync();
            if (img == null)
            {
                return false;
            }
            _context.ImageProducts.Remove(img);
            return true;
        }

        public async Task<bool> DeleteAllImgByIdProduct(int idProduct)
        {
            var imgs = await _context.ImageProducts.Where(i => i.ProductId == idProduct).ToListAsync();
            foreach (var item in imgs)
            {
                await DeleteImgByIdImg(item.ImgId);
            }
            return true;
        }

        public async Task<List<ProductSpecifiactionVM>> GetSpeciByIdProduct(int idProduct)
        {
            var specification = await _context.ProductSpecifiactions.Include(p => p.Product)
                                                    .Where(p => p.ProductId == idProduct).ToListAsync();
            var specificationVM = _mapper.Map<List<ProductSpecifiactionVM>>(specification);
            return specificationVM;
        }

        public async Task<bool> AddSpecifications(List<ProductSpecifiactionModel> models)
        {
            var items = _mapper.Map<List<ProductSpecifiaction>>(models);
            foreach (var spe in items)
            {
                await _context.AddAsync(spe);
            }
            return true;
        }

        public async Task<bool> UpdateSpecifications(List<ProductSpecifiactionModel> models, int idProduct)
        {
            await DeleteAllSpeciByIdProduct(idProduct);
            await AddSpecifications(models);
            return true;
        }

        public async Task<bool> DeleteSpeciByIdSpeci(int idSpecification)
        {
            var spe = await _context.ProductSpecifiactions.Where(i => i.SpecifiactionsId == idSpecification).FirstOrDefaultAsync();
            if (spe == null)
            {
                return false;
            }
            _context.ProductSpecifiactions.Remove(spe);
            return true;
        }

        public async Task<bool> DeleteAllSpeciByIdProduct(int idProduct)
        {
            var spes = await _context.ProductSpecifiactions.Where(i => i.ProductId == idProduct).ToListAsync();
            foreach (var item in spes)
            {
                await DeleteSpeciByIdSpeci(item.SpecifiactionsId);
            }
            return true;
        }

        public async Task<List<ProductVM>> SearchProductByName(string nameProduct)
        {

            List<Product> listProduct;
            if (nameProduct == null)
            {
                listProduct = await _context.Products.ToListAsync();
            }
            else
            {
                listProduct = await _context.Products.Where(i => i.ProductName.Contains(nameProduct)
                                                       || nameProduct.Contains(i.ProductName)).ToListAsync();
            }
            
            var listProductVM = _mapper.Map<List<ProductVM>>(listProduct);
            return listProductVM;
        }

        public async Task<int> SaveImg(SaveImageModel img)
        {
            if (string.IsNullOrEmpty(img.Base64Image))
            {
                throw new Exception("Invalid image data.");
            }
            // Decode Base64 string to byte array
            byte[] imageBytes = Convert.FromBase64String(img.Base64Image);
             ImagesSave imagesSave = _mapper.Map<ImagesSave>(img);
            imagesSave.ImageData = imageBytes;
            await _context.AddAsync(imagesSave);
            await _context.SaveChangesAsync();  
            return imagesSave.Id;
        }

        public async Task<SaveImageVM> GetImageByIdSaveImage(int id)
        {
            var img = await _context.ImagesSaves.Where(p => p.Id == id).FirstOrDefaultAsync();
            if (img == null)
            {
                throw new Exception("Id don't exist.");
            }
            // Decode Base64 string to byte array
            string base64Image = Convert.ToBase64String(img.ImageData);
            SaveImageVM imagesSaveVM = _mapper.Map<SaveImageVM>(img);
            imagesSaveVM.Base64Image = base64Image;
            return imagesSaveVM;
        }
    }


}
