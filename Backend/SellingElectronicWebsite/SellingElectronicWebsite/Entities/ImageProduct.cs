﻿using System;
using System.Collections.Generic;

namespace SellingElectronicWebsite.Entities;

public partial class ImageProduct
{
    public int ImgId { get; set; }

    public string? ImgLink { get; set; }

    public int? ColorId { get; set; }

    public int ProductId { get; set; }

    public virtual Color? Color { get; set; }

    public virtual Product Product { get; set; } = null!;
}
