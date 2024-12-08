using SellingElectronicWebsite.Entities;
namespace SellingElectronicWebsite.ViewModel
{
    public class ProductVM
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; } = null!;

        public string Brand { get; set; } = null!;

        public string Series { get; set; } = null!;

        public decimal Price { get; set; }

        public CategoryVM Category { get; set; }
        public string? MainImg { get; set; }

       public SalesVM sale {  get; set; }
        public ProductVM() {
        }
        public ProductVM(int productId, string productName, string brand, string series, decimal price,
            CategoryVM? Category, string? mainImg)
        {
            ProductId = productId;
            ProductName = productName;
            Brand = brand;
            Series = series;
            Price = price;
            this.Category = Category;
            MainImg = mainImg; 
            sale = null;

        }
    }
}
