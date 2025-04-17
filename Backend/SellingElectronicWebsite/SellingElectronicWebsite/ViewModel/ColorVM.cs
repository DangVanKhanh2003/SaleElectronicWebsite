namespace SellingElectronicWebsite.ViewModel
{
    public class ColorVM
    {
        public int ColorId { get; set; }

        public string ColorName { get; set; }

        public string ColorCode { get; set; }
        public ColorVM() { }
        public ColorVM(int ColorId, string? ColorName, string colorCode)
        {
            this.ColorId = ColorId;
            this.ColorName = ColorName; 
            this.ColorCode = colorCode;
        }
    }
}
