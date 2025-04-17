namespace SellingElectronicWebsite.Model
{
    public class ColorModel
    {
        public string ColorName { get; set; }
        public string ColorCode { get; set; }

        public ColorModel(string? colorName, string ColorCode)
        {
            ColorName = colorName;
            this.ColorCode = ColorCode;
        }
    }
}
