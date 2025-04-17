namespace SellingElectronicWebsite.Model
{
    public class ProductModel
    {

        public string ProductName { get; set; } = null!;

        public string Brand { get; set; } = null!;

        public string Series { get; set; } = null!;

        public decimal Price { get; set; }

        public int? CategoryId { get; set; }
        public string? MainImg { get; set; }
        public string? TypeImg { get; set; }

        public ProductModel() { }
        public ProductModel(string productName, string brand, string series, decimal price, int? categoryId, string mainImg, string typeImg)
        {
            ProductName = productName;
            Brand = brand;
            Series = series;
            Price = price;
            CategoryId = categoryId;
            MainImg = mainImg;
            TypeImg = typeImg;
        }   
    }
}
