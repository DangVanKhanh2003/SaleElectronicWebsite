BEGIN TRY
    BEGIN TRANSACTION;
	SELECT * FROM dbo.Address
    -- Thêm dữ liệu vào bảng Address
    INSERT INTO dbo.Address (Province, District, Commune, Street, NumberHouse)
    VALUES 
        (N'Hà Nội', N'Hoàn Kiếm', N'Phường Hàng Bạc', N'Phố Hàng Bạc', N'Số 1'),
        (N'Hà Nội', N'Hoàn Kiếm', N'Phường Hàng Gai', N'Phố Hàng Gai', N'Số 2'),
        (N'Hà Nội', N'Hoàn Kiếm', N'Phường Lý Thái Tổ', N'Phố Đinh Tiên Hoàng', N'Số 3'),
        (N'Hà Nội', N'Đống Đa', N'Phường Khâm Thiên', N'Phố Khâm Thiên', N'Số 4'),
        (N'Hà Nội', N'Đống Đa', N'Phường Văn Chương', N'Phố Văn Chương', N'Số 5'),
        (N'Hà Nội', N'Ba Đình', N'Phường Đội Cấn', N'Phố Đội Cấn', N'Số 6'),
        (N'Hà Nội', N'Cầu Giấy', N'Phường Trung Hòa', N'Phố Trung Hòa', N'Số 7'),
        (N'Hà Nội', N'Cầu Giấy', N'Phường Yên Hòa', N'Phố Yên Hòa', N'Số 8'),
        (N'Hồ Chí Minh', N'Quận 1', N'Phường Bến Nghé', N'Phố Lê Lợi', N'Số 9'),
        (N'Hồ Chí Minh', N'Quận 1', N'Phường Nguyễn Thái Bình', N'Phố Nguyễn Thái Bình', N'Số 10'),
        (N'Hồ Chí Minh', N'Quận 3', N'Phường 12', N'Phố Trần Quốc Thảo', N'Số 11'),
        (N'Hồ Chí Minh', N'Quận 3', N'Phường 6', N'Phố Nguyễn Thị Minh Khai', N'Số 12'),
        (N'Hồ Chí Minh', N'Quận 4', N'Phường 1', N'Phố Bến Vân Đồn', N'Số 13'),
        (N'Hồ Chí Minh', N'Quận 5', N'Phường 10', N'Phố Trần Hưng Đạo', N'Số 14'),
        (N'Hồ Chí Minh', N'Quận 6', N'Phường 12', N'Phố Minh Phụng', N'Số 15'),
        (N'Hồ Chí Minh', N'Quận 7', N'Phường Tân Phú', N'Phố Nguyễn Thị Thập', N'Số 16'),
        (N'Hồ Chí Minh', N'Quận 8', N'Phường 1', N'Phố Hưng Phú', N'Số 17'),
        (N'Hồ Chí Minh', N'Quận 9', N'Phường Phú Hữu', N'Phố Đỗ Xuân Hợp', N'Số 18'),
        (N'Hà Nội', N'Tây Hồ', N'Phường Xuân La', N'Phố Xuân La', N'Số 19'),
        (N'Hà Nội', N'Tây Hồ', N'Phường Nhật Tân', N'Phố Nhật Tân', N'Số 20'),
        (N'Hà Nội', N'Cầu Giấy', N'Phường Dịch Vọng', N'Phố Dịch Vọng', N'Số 21'),
        (N'Hà Nội', N'Cầu Giấy', N'Phường Dịch Vọng Hậu', N'Phố Dịch Vọng Hậu', N'Số 22'),
        (N'Hồ Chí Minh', N'Quận 1', N'Phường Bến Thành', N'Phố Lê Thánh Tôn', N'Số 23'),
        (N'Hồ Chí Minh', N'Quận 2', N'Phường Thạnh Mỹ Lợi', N'Phố Thạnh Mỹ Lợi', N'Số 24'),
        (N'Hồ Chí Minh', N'Quận 3', N'Phường Võ Thị Sáu', N'Phố Võ Thị Sáu', N'Số 25'),
        (N'Hồ Chí Minh', N'Quận 4', N'Phường 4', N'Phố Đoàn Văn Bơ', N'Số 26'),
        (N'Hà Nội', N'Đống Đa', N'Phường Ô Chợ Dừa', N'Phố Ô Chợ Dừa', N'Số 27'),
        (N'Hà Nội', N'Ba Đình', N'Phường Giảng Võ', N'Phố Giảng Võ', N'Số 28'),
        (N'Hà Nội', N'Tây Hồ', N'Phường Quảng An', N'Phố Quảng An', N'Số 29'),
        (N'Hà Nội', N'Cầu Giấy', N'Phường Nghĩa Đô', N'Phố Nghĩa Đô', N'Số 30');

    -- Thêm dữ liệu vào bảng Stores
    INSERT INTO StoreSchema.Stores (StoreName, AddressId)
    VALUES 
        (N'Shop Điện Tử', 1),
        (N'Shop Thời Trang', 2),
        (N'Shop Nội Thất', 3),
        (N'Shop Thể Thao', 4),
        (N'Shop Sách', 5),
        (N'Shop Mỹ Phẩm', 6),
        (N'Shop Giày Dép', 7),
        (N'Shop Trang Sức', 8),
        (N'Shop Đồ Chơi', 9),
        (N'Shop Đồ Gia Dụng', 10);

    -- Thêm dữ liệu vào bảng Warehouses
    INSERT INTO StoreSchema.Warehouses (WarehouseName, AddressId)
    VALUES 
        (N'Kho Bắc Từ Liêm', 1),
        (N'Kho Hoàng Mai', 2),
        (N'Kho Thái Bình', 3),
        (N'Kho Hải Phòng', 4),
        (N'Kho Quận 1', 5),
        (N'Kho quận 4', 6),
        (N'Kho quận 7', 7),
        (N'Kho Nghệ An', 8),
        (N'Kho Nha Trang', 9),
        (N'Kho Long Biên', 10);

    -- Thêm dữ liệu vào bảng Customers
    INSERT INTO UserSchema.Customers (FullName, Email, PhoneNumber, AddressId)
    VALUES 
        (N'Trần Văn A', N'tranvana@example.com', N'0123456789', 11),
        (N'Nguyễn Văn B', N'nguyenvanb@example.com', N'0123456789', 12),
        (N'Phạm Thị C', N'phamthic@example.com', N'0123456789', 13),
        (N'Lê Văn D', N'levand@example.com', N'0123456789', 14),
        (N'Nguyễn Thị E', N'nguyenthie@example.com', N'0123456789', 15),
        (N'Trần Văn F', N'tranvanf@example.com', N'0123456789', 16),
        (N'Hồ Văn G', N'hovan@example.com', N'0123456789', 17),
        (N'Nguyễn Văn H', N'nguyenvanh@example.com', N'0123456789', 18),
        (N'Vũ Thị I', N'vuthii@example.com', N'0123456789', 19),
        (N'Trần Văn J', N'tranvanj@example.com', N'0123456789', 20);

	INSERT INTO UserSchema.AddressCustomer (Province, District, Commune, Street, NumberHouse, PhoneNumber, CustomerId) 
	VALUES
		(N'Hà Nội', N'Hoàn Kiếm', N'Phố Huế', N'Nguyễn Thái Học', N'1', '0912345678', 1),
		(N'Hà Nội', N'Đống Đa', N'Kim Liên', N'Trần Quý Cáp', N'2', '0912345679', 1),
		(N'Hà Nội', N'Cầu Giấy', N'Dịch Vọng', N'Cầu Giấy', N'3', '0912345680', 2),
		(N'Hà Nội', N'Ba Đình', N'Ngọc Hà', N'Phan Đình Phùng', N'4', '0912345681', 2),
		(N'Hà Nội', N'Tây Hồ', N'Phú Thượng', N'Đặng Thai Mai', N'5', '0912345682', 3),
		(N'Hà Nội', N'Thanh Xuân', N'Khương Đình', N'Lê Văn Thiêm', N'6', '0912345683', 3),
		(N'Hà Nội', N'Hoàng Mai', N'Đại Kim', N'Nguyễn Xiển', N'7', '0912345684', 4),
		(N'Hà Nội', N'Long Biên', N'Giang Biên', N'Nguyễn Văn Cừ', N'8', '0912345685', 4),
		(N'Hà Nội', N'Gia Lâm', N'Yên Viên', N'Đường Vạn Hạnh', N'9', '0912345686', 5),
		(N'Hà Nội', N'Nam Từ Liêm', N'Mỹ Đình', N'Phạm Hùng', N'10', '0912345687', 5),
		(N'Hà Nội', N'Hai Bà Trưng', N'Bạch Đằng', N'Trần Nhân Tông', N'11', '0912345688', 6),
		(N'Hà Nội', N'Đống Đa', N'Phương Liên', N'Trường Chinh', N'12', '0912345689', 6),
		(N'Hà Nội', N'Hoàn Kiếm', N'Chương Dương', N'Trần Hưng Đạo', N'13', '0912345690', 7),
		(N'Hà Nội', N'Ba Đình', N'Điện Biên', N'Đội Cấn', N'14', '0912345691', 7),
		(N'Hà Nội', N'Cầu Giấy', N'Yên Hòa', N'Nguyễn Khang', N'15', '0912345692', 8),
		(N'Hà Nội', N'Tây Hồ', N'Tây Hồ', N'Thụy Khuê', N'16', '0912345693', 8),
		(N'Hà Nội', N'Thanh Xuân', N'Hạ Đình', N'Lê Trọng Tấn', N'17', '0912345694', 9),
		(N'Hà Nội', N'Hoàng Mai', N'Thanh Trì', N'Ngọc Hồi', N'18', '0912345695', 9),
		(N'Hà Nội', N'Long Biên', N'Phúc Lợi', N'Ngô Gia Tự', N'19', '0912345696', 10),
		(N'Hà Nội', N'Gia Lâm', N'Dương Xá', N'Đường Bát Khối', N'20', '0912345697', 10),
		(N'Hà Nội', N'Nam Từ Liêm', N'Phú Mỹ', N'Đường Phú Mỹ', N'21', '0912345698', 1),
		(N'Hà Nội', N'Hai Bà Trưng', N'Đồng Nhân', N'Bùi Thị Xuân', N'22', '0912345699', 1),
		(N'Hà Nội', N'Đống Đa', N'Khâm Thiên', N'Khâm Thiên', N'23', '0912345700', 2),
		(N'Hà Nội', N'Hoàn Kiếm', N'Tràng Tiền', N'Tràng Tiền', N'24', '0912345701', 2),
		(N'Hà Nội', N'Cầu Giấy', N'Mai Dịch', N'Mai Dịch', N'25', '0912345702', 3),
		(N'Hà Nội', N'Ba Đình', N'Trúc Bạch', N'Trúc Bạch', N'26', '0912345703', 3),
		(N'Hà Nội', N'Tây Hồ', N'Tây Hồ', N'Lạc Long Quân', N'27', '0912345704', 4),
		(N'Hà Nội', N'Thanh Xuân', N'Kim Giang', N'Kim Giang', N'28', '0912345705', 4),
		(N'Hà Nội', N'Hoàng Mai', N'Thịnh Liệt', N'Lĩnh Nam', N'29', '0912345706', 5),
		(N'Hà Nội', N'Long Biên', N'Thạch Bàn', N'Nguyễn Văn Cừ', N'30', '0912345707', 5);



    -- Thêm dữ liệu vào bảng Department
    INSERT INTO UserSchema.Department (DepartmentName)
    VALUES 
        (N'Tiếp thị'),
        (N'kho'),
        (N'Quản Lý');

    -- Thêm dữ liệu vào bảng Position
    INSERT INTO UserSchema.Position (PositionName, DepartmentId)
    VALUES 
        (N'Admin', 3),
        (N'Nhân viên trực online', 1),
        (N'Nhân viên kho', 2),
        (N'Nhân viên bán hàng', 1);

    -- Thêm dữ liệu vào bảng Employees
    INSERT INTO UserSchema.Employees (FullName, Email, PhoneNumber, PositionId, StoreId, AddressId)
    VALUES 
        (N'Nguyễn Văn C', N'nguyenvanc@example.com', N'0123456789', 1, 1, 1),
        (N'Trần Thị D', N'tranthid@example.com', N'0123456789', 2, 2, 2),
        (N'Phạm Văn E', N'phamvane@example.com', N'0123456789', 3, 3, 3),
        (N'Lê Thị F', N'lethif@example.com', N'0123456789', 1, 4, 4),
        (N'Nguyễn Văn G', N'nguyenvang@example.com', N'0123456789', 1, 5, 5),
        (N'Trần Văn H', N'tranvanh@example.com', N'0123456789', 2, 6, 6),
        (N'Vũ Thị I', N'vuthi@example.com', N'0123456789', 2, 7, 7),
        (N'Hồ Văn J', N'hovanj@example.com', N'0123456789', 4, 8, 8),
        (N'Trần Văn K', N'tranvank@example.com', N'0123456789', 4, 9, 9),
        (N'Nguyễn Thị L', N'nguyenthil@example.com', N'0123456789', 4, 10, 10);
		-- Insert data into AccountSchema.AccountCustomer




	-- Insert data into ProductSchema.Categories
	INSERT INTO ProductSchema.Categories (CategoryName)
	VALUES 
	(N'Điện thoại'),
	(N'Máy tính'),
	(N'Thiết bị văn phòng'),
	(N'Đồ gia dụng'),
	(N'Tivi'),
	(N'Đồng hồ'),
	(N'Âm thanh');
	-- Thêm sản phẩm vào bảng Products
	INSERT INTO ProductSchema.Products (ProductName, Brand, Series, Price, CategoryId)
		VALUES 
		('iPhone 14', 'Apple', 'iPhone', 999.99, 1), -- Điện thoại
		('Samsung Galaxy S23', 'Samsung', 'Galaxy S', 899.99, 1), -- Điện thoại
		('Google Pixel 7', 'Google', 'Pixel', 699.99, 1), -- Điện thoại
		('OnePlus 11', 'OnePlus', '11', 749.99, 1), -- Điện thoại
		('Xiaomi Redmi Note 12', 'Xiaomi', 'Redmi Note', 299.99, 1), -- Điện thoại
		('HP Spectre x360', 'HP', 'Spectre', 1399.99, 2), -- Máy tính
		('Dell XPS 13', 'Dell', 'XPS', 1299.99, 2), -- Máy tính
		('Lenovo ThinkPad X1 Carbon', 'Lenovo', 'ThinkPad', 1499.99, 2), -- Máy tính
		('Acer Aspire 5', 'Acer', 'Aspire', 699.99, 2), -- Máy tính
		('Asus ROG Zephyrus', 'Asus', 'ROG', 1799.99, 2), -- Máy tính
		('Brother HL-L2350DW', 'Brother', 'HL-L', 129.99, 3), -- Thiết bị văn phòng
		('HP OfficeJet Pro 9015e', 'HP', 'OfficeJet', 199.99, 3), -- Thiết bị văn phòng
		('Canon imageCLASS MF445dw', 'Canon', 'imageCLASS', 299.99, 3), -- Thiết bị văn phòng
		('Epson EcoTank ET-4760', 'Epson', 'EcoTank', 349.99, 3), -- Thiết bị văn phòng
		('Dymo LabelWriter 450', 'Dymo', 'LabelWriter', 59.99, 3), -- Thiết bị văn phòng
		('Nồi cơm điện Panasonic', 'Panasonic', 'Nồi cơm', 79.99, 4), -- Đồ gia dụng
		('Máy xay sinh tố', 'Oster', 'Blend', 49.99, 4), -- Đồ gia dụng
		('Bếp từ', 'Toshiba', 'Bếp từ', 199.99, 4), -- Đồ gia dụng
		('Lò vi sóng Panasonic', 'Panasonic', 'Lò vi sóng', 129.99, 4), -- Đồ gia dụng
		('Máy lọc không khí', 'Philips', 'Máy lọc', 199.99, 4), -- Đồ gia dụng
		('LG OLED TV', 'LG', 'OLED', 2499.99, 5), -- Tivi
		('Samsung QLED TV', 'Samsung', 'QLED', 1999.99, 5), -- Tivi
		('Sony Bravia 4K TV', 'Sony', 'Bravia', 1799.99, 5), -- Tivi
		('Tivi Xiaomi', 'Xiaomi', 'Mi TV', 599.99, 5), -- Tivi
		('Tivi TCL 55 inch', 'TCL', 'Tivi', 699.99, 5), -- Tivi
		('Đồng hồ thông minh Apple', 'Apple', 'Watch', 399.99, 6), -- Đồng hồ
		('Samsung Galaxy Watch', 'Samsung', 'Galaxy', 349.99, 6), -- Đồng hồ
		('Fossil Gen 6', 'Fossil', 'Gen 6', 299.99, 6), -- Đồng hồ
		('Garmin Forerunner', 'Garmin', 'Forerunner', 249.99, 6), -- Đồng hồ
		('Đồng hồ Casio G-Shock', 'Casio', 'G-Shock', 99.99, 6), -- Đồng hồ
		('Loa Bluetooth JBL', 'JBL', 'Bluetooth', 149.99, 7), -- Âm thanh
		('Sony WH-1000XM4', 'Sony', 'WH-1000XM4', 349.99, 7), -- Âm thanh
		('Bose SoundLink Revolve', 'Bose', 'SoundLink', 199.99, 7), -- Âm thanh
		('Loa kéo Bluetooth', 'Loa Kéo', 'Bluetooth', 249.99, 7), -- Âm thanh
		('Tai nghe Sennheiser', 'Sennheiser', 'Tai nghe', 299.99, 7), -- Âm thanh
		('iPad Pro 11 inch', 'Apple', 'iPad', 799.99, 2), -- Máy tính
		('Microsoft Surface Laptop', 'Microsoft', 'Surface', 1299.99, 2), -- Máy tính
		('MacBook Air', 'Apple', 'MacBook', 999.99, 2), -- Máy tính
		('Laptop Dell Inspiron', 'Dell', 'Inspiron', 599.99, 2), -- Máy tính
		('Laptop Asus VivoBook', 'Asus', 'VivoBook', 549.99, 2); -- Máy tính
		-- Dữ liệu cho iPhone 14
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Màn hình', N'Màn hình Super Retina XDR 6.1 inch với độ phân giải 2532 x 1170 pixel', 1),
		(N'Chip', N'Apple A15 Bionic', 1),
		(N'Camera', N'Camera chính 12MP, camera trước 12MP với chế độ Night mode', 1),
		(N'Pin', N'Pin 3279 mAh với thời gian sử dụng lên đến 20 giờ', 1),
		(N'Hệ điều hành', N'iOS 16, với nhiều tính năng mới', 1),
		(N'Tính năng', N'Chống nước IP68', 1),
		(N'Kết nối', N'5G, Wi-Fi 6', 1),
		(N'Dung lượng lưu trữ', N'Lựa chọn 128GB, 256GB hoặc 512GB', 1),
		(N'Màu sắc', N'Cung cấp các màu: Đen, Trắng, Vàng, Tím', 1),
		(N'Trọng lượng', N'Trọng lượng 174 grams', 1);

	-- Dữ liệu cho Samsung Galaxy S23
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Màn hình', N'Màn hình Dynamic AMOLED 2X 6.1 inch, độ phân giải 2400 x 1080', 2),
		(N'Chip', N'Snapdragon 8 Gen 2', 2),
		(N'Camera', N'Camera chính 50MP, camera trước 12MP', 2),
		(N'Pin', N'Pin 3900 mAh với sạc nhanh 25W', 2),
		(N'Hệ điều hành', N'Android 13, One UI 5.0', 2),
		(N'Tính năng', N'Tính năng chống nước IP68', 2),
		(N'Dung lượng lưu trữ', N'Lựa chọn 128GB hoặc 256GB', 2),
		(N'Màu sắc', N'Cung cấp các màu: Đen, Trắng, Vàng', 2),
		(N'Trọng lượng', N'Trọng lượng 168 grams', 2),
		(N'Kết nối', N'5G, Wi-Fi 6', 2);

	-- Dữ liệu cho Google Pixel 7
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Màn hình', N'Màn hình OLED 6.3 inch, độ phân giải 2400 x 1080', 3),
		(N'Chip', N'Google Tensor G2', 3),
		(N'Camera', N'Camera chính 50MP, camera trước 10.8MP', 3),
		(N'Pin', N'Pin 4355 mAh với sạc nhanh 30W', 3),
		(N'Hệ điều hành', N'Android 13', 3),
		(N'Tính năng', N'Tính năng chống nước IP68', 3),
		(N'Dung lượng lưu trữ', N'Lựa chọn 128GB hoặc 256GB', 3),
		(N'Màu sắc', N'Cung cấp các màu: Đen, Trắng, Xanh lá', 3),
		(N'Trọng lượng', N'Trọng lượng 197 grams', 3),
		(N'Kết nối', N'5G, Wi-Fi 6', 3);

	-- Dữ liệu cho OnePlus 11
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Màn hình', N'Màn hình Fluid AMOLED 6.7 inch, độ phân giải 3216 x 1440', 4),
		(N'Chip', N'Snapdragon 8 Gen 2', 4),
		(N'Camera', N'Camera chính 50MP, camera trước 32MP', 4),
		(N'Pin', N'Pin 5000 mAh với sạc nhanh 100W', 4),
		(N'Hệ điều hành', N'Android 13, OxygenOS 13', 4),
		(N'Tính năng', N'Tính năng chống nước IP64', 4),
		(N'Dung lượng lưu trữ', N'Lựa chọn 128GB, 256GB hoặc 512GB', 4),
		(N'Màu sắc', N'Cung cấp các màu: Đen, Trắng, Xanh', 4),
		(N'Trọng lượng', N'Trọng lượng 205 grams', 4),
		(N'Kết nối', N'5G, Wi-Fi 6', 4);

	-- Dữ liệu cho Xiaomi Redmi Note 12
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Màn hình', N'Màn hình AMOLED 6.67 inch, độ phân giải 2400 x 1080', 5),
		(N'Chip', N'Snapdragon 685', 5),
		(N'Camera', N'Camera chính 108MP, camera trước 13MP', 5),
		(N'Pin', N'Pin 5000 mAh với sạc nhanh 33W', 5),
		(N'Hệ điều hành', N'MIUI 13, dựa trên Android 12', 5),
		(N'Tính năng', N'Tính năng chống nước IP53', 5),
		(N'Dung lượng lưu trữ', N'Lựa chọn 64GB, 128GB hoặc 256GB', 5),
		(N'Màu sắc', N'Cung cấp các màu: Đen, Trắng, Đỏ', 5),
		(N'Trọng lượng', N'Trọng lượng 188 grams', 5),
		(N'Kết nối', N'4G, Wi-Fi 5', 5);

	-- Dữ liệu cho HP Spectre x360
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Màn hình', N'Màn hình OLED 13.3 inch, độ phân giải 1920 x 1080', 6),
		(N'Chip', N'Intel Core i7-1355U', 6),
		(N'RAM', N'16GB LPDDR4X', 6),
		(N'Dung lượng lưu trữ', N'512GB PCIe NVMe SSD', 6),
		(N'Pin', N'Thời gian sử dụng lên đến 15 giờ', 6),
		(N'Tính năng', N'Thiết kế 2 trong 1, có thể gập lại', 6),
		(N'Kết nối', N'Wi-Fi 6E, Bluetooth 5.0', 6),
		(N'Kích thước', N'Mỏng 13.5 mm, trọng lượng 1.3 kg', 6),
		(N'Đồ họa', N'Intel Iris Xe Graphics', 6),
		(N'Hệ điều hành', N'Windows 11 Home', 6);

	-- Dữ liệu cho Dell XPS 13
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Màn hình', N'Màn hình InfinityEdge 13.4 inch, độ phân giải 1920 x 1200', 7),
		(N'Chip', N'Intel Core i7-1250U', 7),
		(N'RAM', N'16GB LPDDR5', 7),
		(N'Dung lượng lưu trữ', N'1TB PCIe NVMe SSD', 7),
		(N'Pin', N'Thời gian sử dụng lên đến 12 giờ', 7),
		(N'Tính năng', N'Thiết kế mỏng nhẹ, dễ dàng mang theo', 7),
		(N'Kết nối', N'Wi-Fi 6E, Bluetooth 5.2', 7),
		(N'Kích thước', N'Mỏng 15.5 mm, trọng lượng 1.2 kg', 7),
		(N'Đồ họa', N'Intel Iris Xe Graphics', 7),
		(N'Hệ điều hành', N'Windows 11 Home', 7);

	-- Dữ liệu cho Lenovo ThinkPad X1 Carbon
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Màn hình', N'Màn hình 14 inch, độ phân giải 1920 x 1200', 8),
		(N'Chip', N'Intel Core i7-1260P', 8),
		(N'RAM', N'16GB LPDDR5', 8),
		(N'Dung lượng lưu trữ', N'512GB PCIe NVMe SSD', 8),
		(N'Pin', N'Thời gian sử dụng lên đến 15 giờ', 8),
		(N'Tính năng', N'Thân máy chắc chắn, chống sốc và nước', 8),
		(N'Kết nối', N'Wi-Fi 6E, Bluetooth 5.2', 8),
		(N'Kích thước', N'Mỏng 14.9 mm, trọng lượng 1.12 kg', 8),
		(N'Đồ họa', N'Intel Iris Xe Graphics', 8),
		(N'Hệ điều hành', N'Windows 11 Pro', 8);

	-- Dữ liệu cho Acer Aspire 5
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Màn hình', N'Màn hình 15.6 inch Full HD, độ phân giải 1920 x 1080', 9),
		(N'Chip', N'Intel Core i5-1235U', 9),
		(N'RAM', N'8GB DDR4', 9),
		(N'Dung lượng lưu trữ', N'512GB PCIe NVMe SSD', 9),
		(N'Pin', N'Thời gian sử dụng lên đến 10 giờ', 9),
		(N'Tính năng', N'Thiết kế mỏng nhẹ, dễ dàng mang theo', 9),
		(N'Kết nối', N'Wi-Fi 6, Bluetooth 5.1', 9),
		(N'Kích thước', N'Mỏng 17.9 mm, trọng lượng 1.8 kg', 9),
		(N'Đồ họa', N'Intel Iris Xe Graphics', 9),
		(N'Hệ điều hành', N'Windows 11 Home', 9);

	-- Dữ liệu cho Asus ROG Zephyrus
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Màn hình', N'Màn hình 15.6 inch Full HD, tần số quét 165Hz', 10),
		(N'Chip', N'AMD Ryzen 9 5900HS', 10),
		(N'RAM', N'32GB DDR4', 10),
		(N'Dung lượng lưu trữ', N'1TB PCIe NVMe SSD', 10),
		(N'Pin', N'Thời gian sử dụng lên đến 8 giờ', 10),
		(N'Tính năng', N'Hỗ trợ RGB, thiết kế game thủ', 10),
		(N'Kết nối', N'Wi-Fi 6, Bluetooth 5.1', 10),
		(N'Kích thước', N'Mỏng 20.9 mm, trọng lượng 2.3 kg', 10),
		(N'Đồ họa', N'NVIDIA GeForce RTX 3060', 10),
		(N'Hệ điều hành', N'Windows 11 Home', 10);

	-- Dữ liệu cho Brother HL-L2350DW
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Loại máy', N'Máy in laser đơn sắc', 11),
		(N'Tốc độ in', N'Tối đa 32 trang/phút', 11),
		(N'Độ phân giải', N'600 x 600 dpi', 11),
		(N'Kết nối', N'USB 2.0, Wi-Fi, Ethernet', 11),
		(N'Khổ giấy', N'Tối đa A4', 11),
		(N'Khay giấy', N'Thể chứa 250 tờ', 11),
		(N'Tính năng', N'In hai mặt tự động', 11),
		(N'Kích thước', N'360 x 357 x 183 mm', 11),
		(N'Trong lượng', N'Trong lượng 7.2 kg', 11),
		(N'Nhà sản xuất', N'Brother', 11);

	-- Dữ liệu cho HP OfficeJet Pro 9015e
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Loại máy', N'Máy in đa năng (In, scan, copy, fax)', 12),
		(N'Tốc độ in', N'Tối đa 22 trang/phút màu', 12),
		(N'Độ phân giải', N'4800 x 1200 dpi', 12),
		(N'Kết nối', N'USB 2.0, Wi-Fi, Ethernet, Bluetooth', 12),
		(N'Khổ giấy', N'Tối đa A4', 12),
		(N'Khay giấy', N'Thể chứa 250 tờ', 12),
		(N'Tính năng', N'In hai mặt tự động, scan hai mặt tự động', 12),
		(N'Kích thước', N'430 x 370 x 210 mm', 12),
		(N'Trong lượng', N'Trong lượng 6.5 kg', 12),
		(N'Nhà sản xuất', N'HP', 12);

	-- Dữ liệu cho Canon imageCLASS MF445dw
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Loại máy', N'Máy in laser đa năng', 13),
		(N'Tốc độ in', N'Tối đa 40 trang/phút', 13),
		(N'Độ phân giải', N'600 x 600 dpi', 13),
		(N'Kết nối', N'USB 2.0, Wi-Fi, Ethernet', 13),
		(N'Khổ giấy', N'Tối đa A4', 13),
		(N'Khay giấy', N'Thể chứa 250 tờ', 13),
		(N'Tính năng', N'In hai mặt tự động, scan hai mặt tự động', 13),
		(N'Kích thước', N'400 x 400 x 300 mm', 13),
		(N'Trong lượng', N'Trong lượng 13 kg', 13),
		(N'Nhà sản xuất', N'Canon', 13);

	-- Dữ liệu cho Epson EcoTank ET-4760
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Loại máy', N'Máy in phun đa năng', 14),
		(N'Tốc độ in', N'Tối đa 15 trang/phút màu', 14),
		(N'Độ phân giải', N'4800 x 1200 dpi', 14),
		(N'Kết nối', N'USB 2.0, Wi-Fi, Ethernet', 14),
		(N'Khổ giấy', N'Tối đa A4', 14),
		(N'Khay giấy', N'Thể chứa 250 tờ', 14),
		(N'Tính năng', N'In hai mặt tự động', 14),
		(N'Kích thước', N'375 x 347 x 189 mm', 14),
		(N'Trong lượng', N'Trong lượng 5.8 kg', 14),
		(N'Nhà sản xuất', N'Epson', 14);

	-- Dữ liệu cho Dymo LabelWriter 450
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Loại máy', N'Máy in nhãn', 15),
		(N'Tốc độ in', N'Tối đa 51 nhãn/phút', 15),
		(N'Kết nối', N'USB 2.0', 15),
		(N'Khổ giấy', N'Tối đa 1 inch', 15),
		(N'Tính năng', N'In nhãn tự động', 15),
		(N'Kích thước', N'7 x 5 x 5 inches', 15),
		(N'Trong lượng', N'Trong lượng 1 kg', 15),
		(N'Nhà sản xuất', N'Dymo', 15),
		(N'Màu sắc', N'Đen', 15),
		(N'Phần mềm', N'Phần mềm in nhãn kèm theo', 15);

	-- Dữ liệu cho Nồi cơm điện Panasonic
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Loại nồi', N'Nồi cơm điện tự động', 16),
		(N'Công suất', N'600W', 16),
		(N'Thể tích', N'1.8L', 16),
		(N'Màu sắc', N'Đen', 16),
		(N'Tính năng', N'Chế độ nấu nhanh', 16),
		(N'Tính năng', N'Chế độ giữ ấm', 16),
		(N'Kích thước', N'27 x 25 x 24 cm', 16),
		(N'Trong lượng', N'Trong lượng 2 kg', 16),
		(N'Nhà sản xuất', N'Panasonic', 16),
		(N'Chất liệu', N'Nhựa và inox', 16);

	-- Dữ liệu cho Máy xay sinh tố
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Loại máy', N'Máy xay sinh tố cầm tay', 17),
		(N'Công suất', N'300W', 17),
		(N'Chất liệu', N'Nhựa cao cấp', 17),
		(N'Màu sắc', N'Đỏ', 17),
		(N'Tính năng', N'Chế độ xay nhuyễn', 17),
		(N'Tính năng', N'Chế độ xay đá', 17),
		(N'Kích thước', N'35 x 20 x 15 cm', 17),
		(N'Trong lượng', N'Trong lượng 1.5 kg', 17),
		(N'Nhà sản xuất', N'Oster', 17),
		(N'Bảo hành', N'12 tháng', 17);

	-- Dữ liệu cho Bếp từ
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Loại bếp', N'Bếp từ đôi', 18),
		(N'Công suất', N'2000W', 18),
		(N'Tính năng', N'Chế độ tiết kiệm năng lượng', 18),
		(N'Tính năng', N'Chế độ hẹn giờ', 18),
		(N'Kích thước', N'30 x 60 cm', 18),
		(N'Trong lượng', N'Trong lượng 2 kg', 18),
		(N'Nhà sản xuất', N'Toshiba', 18),
		(N'Màu sắc', N'Đen', 18),
		(N'Chất liệu', N'Kính chịu nhiệt', 18),
		(N'Bảo hành', N'12 tháng', 18);

	-- Dữ liệu cho Lò vi sóng Panasonic
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Loại lò', N'Lò vi sóng cơ', 19),
		(N'Công suất', N'800W', 19),
		(N'Thể tích', N'20L', 19),
		(N'Tính năng', N'Chế độ rã đông', 19),
		(N'Tính năng', N'Chế độ nướng', 19),
		(N'Kích thước', N'45 x 34 x 26 cm', 19),
		(N'Trong lượng', N'Trong lượng 11 kg', 19),
		(N'Nhà sản xuất', N'Panasonic', 19),
		(N'Màu sắc', N'Đen', 19),
		(N'Chất liệu', N'Nhựa cao cấp', 19);

	-- Dữ liệu cho Máy lọc không khí
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Loại máy', N'Máy lọc không khí', 20),
		(N'Công suất', N'40W', 20),
		(N'Thể tích', N'Tối đa 45m²', 20),
		(N'Tính năng', N'Hệ thống lọc HEPA', 20),
		(N'Tính năng', N'Chế độ tự động', 20),
		(N'Kích thước', N'30 x 25 x 50 cm', 20),
		(N'Trong lượng', N'Trong lượng 5 kg', 20),
		(N'Nhà sản xuất', N'Philips', 20),
		(N'Màu sắc', N'Trắng', 20),
		(N'Bảo hành', N'24 tháng', 20);

	-- Dữ liệu cho LG OLED TV
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Tiêu chuẩn', N'OLED 4K HDR', 21),
		(N'Kích thước màn hình', N'65 inch', 21),
		(N'Độ phân giải', N'3840 x 2160', 21),
		(N'Công nghệ âm thanh', N'Dolby Atmos', 21),
		(N'Tính năng', N'Tích hợp AI', 21),
		(N'Kích thước', N'144 x 65.1 x 5.8 cm', 21),
		(N'Trong lượng', N'Trong lượng 25 kg', 21),
		(N'Nhà sản xuất', N'LG', 21),
		(N'Màu sắc', N'Đen', 21),
		(N'Thiết kế', N'Thiết kế không viền', 21);

	-- Dữ liệu cho Samsung QLED TV
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Tiêu chuẩn', N'QLED 4K HDR', 22),
		(N'Kích thước màn hình', N'65 inch', 22),
		(N'Độ phân giải', N'3840 x 2160', 22),
		(N'Công nghệ âm thanh', N'Dolby Digital Plus', 22),
		(N'Tính năng', N'Tích hợp AI', 22),
		(N'Kích thước', N'144 x 66.1 x 5.8 cm', 22),
		(N'Trong lượng', N'Trong lượng 30 kg', 22),
		(N'Nhà sản xuất', N'Samsung', 22),
		(N'Màu sắc', N'Đen', 22),
		(N'Thiết kế', N'Thiết kế không viền', 22);

	-- Dữ liệu cho Sony Bravia 4K TV
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Tiêu chuẩn', N'4K HDR', 23),
		(N'Kích thước màn hình', N'65 inch', 23),
		(N'Độ phân giải', N'3840 x 2160', 23),
		(N'Công nghệ âm thanh', N'Dolby Atmos', 23),
		(N'Tính năng', N'Tích hợp AI', 23),
		(N'Kích thước', N'144 x 66.1 x 6.3 cm', 23),
		(N'Trong lượng', N'Trong lượng 30 kg', 23),
		(N'Nhà sản xuất', N'Sony', 23),
		(N'Màu sắc', N'Đen', 23),
		(N'Thiết kế', N'Thiết kế không viền', 23);

	-- Dữ liệu cho Tivi Xiaomi
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Tiêu chuẩn', N'4K HDR', 24),
		(N'Kích thước màn hình', N'55 inch', 24),
		(N'Độ phân giải', N'3840 x 2160', 24),
		(N'Công nghệ âm thanh', N'Dolby Audio', 24),
		(N'Tính năng', N'Tích hợp AI', 24),
		(N'Kích thước', N'123 x 73 x 8.5 cm', 24),
		(N'Trong lượng', N'Trong lượng 12 kg', 24),
		(N'Nhà sản xuất', N'Xiaomi', 24),
		(N'Màu sắc', N'Đen', 24),
		(N'Thiết kế', N'Thiết kế không viền', 24);

	-- Dữ liệu cho Tivi TCL 55 inch
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Tiêu chuẩn', N'4K HDR', 25),
		(N'Kích thước màn hình', N'55 inch', 25),
		(N'Độ phân giải', N'3840 x 2160', 25),
		(N'Công nghệ âm thanh', N'Dolby Audio', 25),
		(N'Tính năng', N'Tích hợp AI', 25),
		(N'Kích thước', N'123 x 70 x 8.5 cm', 25),
		(N'Trong lượng', N'Trong lượng 12 kg', 25),
		(N'Nhà sản xuất', N'TCL', 25),
		(N'Màu sắc', N'Đen', 25),
		(N'Thiết kế', N'Thiết kế không viền', 25);

	-- Dữ liệu cho Đồng hồ thông minh Apple
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Màn hình', N'Màn hình OLED 1.78 inch', 26),
		(N'Chip', N'S1 SIP', 26),
		(N'RAM', N'32GB', 26),
		(N'Pin', N'Thiết kế tiết kiệm năng lượng, thời gian sử dụng lên đến 18 giờ', 26),
		(N'Tính năng', N'Theo dõi sức khỏe, đo nhịp tim', 26),
		(N'Kết nối', N'Bluetooth 5.0', 26),
		(N'Kích thước', N'44mm', 26),
		(N'Trong lượng', N'Trong lượng 32g', 26),
		(N'Nhà sản xuất', N'Apple', 26),
		(N'Màu sắc', N'Đen, bạc, vàng', 26);

	-- Dữ liệu cho Đồng hồ thông minh Samsung
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Màn hình', N'Màn hình Super AMOLED 1.4 inch', 27),
		(N'Chip', N'Exynos W920', 27),
		(N'RAM', N'16GB', 27),
		(N'Pin', N'Thiết kế tiết kiệm năng lượng, thời gian sử dụng lên đến 40 giờ', 27),
		(N'Tính năng', N'Theo dõi sức khỏe, đo nhịp tim', 27),
		(N'Kết nối', N'Bluetooth 5.0', 27),
		(N'Kích thước', N'46mm', 27),
		(N'Trong lượng', N'Trong lượng 30g', 27),
		(N'Nhà sản xuất', N'Samsung', 27),
		(N'Màu sắc', N'Đen, bạc', 27);

	-- Dữ liệu cho Đồng hồ thông minh Garmin
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Màn hình', N'Màn hình MIP 1.3 inch', 28),
		(N'Chip', N'SC 2.5', 28),
		(N'RAM', N'16GB', 28),
		(N'Pin', N'Thiết kế tiết kiệm năng lượng, thời gian sử dụng lên đến 14 ngày', 28),
		(N'Tính năng', N'Theo dõi sức khỏe, GPS', 28),
		(N'Kết nối', N'Bluetooth 5.0', 28),
		(N'Kích thước', N'45mm', 28),
		(N'Trong lượng', N'Trong lượng 50g', 28),
		(N'Nhà sản xuất', N'Garmin', 28),
		(N'Màu sắc', N'Đen, bạc', 28);

	-- Dữ liệu cho Đồng hồ thông minh Fitbit
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Màn hình', N'Màn hình AMOLED 1.58 inch', 29),
		(N'Chip', N'SC 4.0', 29),
		(N'RAM', N'4GB', 29),
		(N'Pin', N'Thiết kế tiết kiệm năng lượng, thời gian sử dụng lên đến 6 ngày', 29),
		(N'Tính năng', N'Theo dõi sức khỏe, đo nhịp tim', 29),
		(N'Kết nối', N'Bluetooth 5.0', 29),
		(N'Kích thước', N'40mm', 29),
		(N'Trong lượng', N'Trong lượng 20g', 29),
		(N'Nhà sản xuất', N'Fitbit', 29),
		(N'Màu sắc', N'Đen, hồng', 29);

	-- Dữ liệu cho Tai nghe Sony WH-1000XM4
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Thiết kế', N'Tai nghe chụp tai không dây', 30),
		(N'Tính năng', N'Khử tiếng ồn chủ động', 30),
		(N'Tính năng', N'Tích hợp trợ lý ảo', 30),
		(N'Tính năng', N'Chất lượng âm thanh cao', 30),
		(N'Trong lượng', N'Trong lượng 254g', 30),
		(N'Nhà sản xuất', N'Sony', 30),
		(N'Màu sắc', N'Đen, bạc', 30);

	-- Dữ liệu cho Tai nghe Apple AirPods Pro
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Thiết kế', N'Tai nghe không dây in-ear', 31),
		(N'Tính năng', N'Khử tiếng ồn chủ động', 31),
		(N'Tính năng', N'Tích hợp Siri', 31),
		(N'Tính năng', N'Chất lượng âm thanh cao', 31),
		(N'Trong lượng', N'Trong lượng 5.4g', 31),
		(N'Nhà sản xuất', N'Apple', 31),
		(N'Màu sắc', N'Đen, trắng', 31);

	-- Dữ liệu cho Tai nghe Bose QuietComfort 35 II
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Thiết kế', N'Tai nghe chụp tai không dây', 32),
		(N'Tính năng', N'Khử tiếng ồn chủ động', 32),
		(N'Tính năng', N'Tích hợp trợ lý ảo', 32),
		(N'Tính năng', N'Chất lượng âm thanh cao', 32),
		(N'Trong lượng', N'Trong lượng 235g', 32),
		(N'Nhà sản xuất', N'Bose', 32),
		(N'Màu sắc', N'Đen, trắng', 32);

	-- Dữ liệu cho Tai nghe Sennheiser Momentum 3
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Thiết kế', N'Tai nghe chụp tai không dây', 33),
		(N'Tính năng', N'Khử tiếng ồn chủ động', 33),
		(N'Tính năng', N'Tích hợp trợ lý ảo', 33),
		(N'Tính năng', N'Chất lượng âm thanh cao', 33),
		(N'Trong lượng', N'Trong lượng 495g', 33),
		(N'Nhà sản xuất', N'Sennheiser', 33),
		(N'Màu sắc', N'Đen, nâu', 33);

	-- Dữ liệu cho Máy tính bảng Apple iPad
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Màn hình', N'Màn hình Retina 10.2 inch', 34),
		(N'Chip', N'A13 Bionic', 34),
		(N'RAM', N'3GB', 34),
		(N'Dung lượng lưu trữ', N'32GB', 34),
		(N'Kết nối', N'Wi-Fi, LTE', 34),
		(N'Kích thước', N'24.86 x 17.95 x 0.75 cm', 34),
		(N'Trong lượng', N'Trong lượng 487g', 34),
		(N'Nhà sản xuất', N'Apple', 34),
		(N'Màu sắc', N'Đen, bạc', 34);

	-- Dữ liệu cho Máy tính bảng Samsung Galaxy Tab S6
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Màn hình', N'Màn hình Super AMOLED 10.5 inch', 35),
		(N'Chip', N'Snapdragon 855', 35),
		(N'RAM', N'6GB', 35),
		(N'Dung lượng lưu trữ', N'128GB', 35),
		(N'Kết nối', N'Wi-Fi, LTE', 35),
		(N'Kích thước', N'25.06 x 16.51 x 0.25 cm', 35),
		(N'Trong lượng', N'Trong lượng 420g', 35),
		(N'Nhà sản xuất', N'Samsung', 35),
		(N'Màu sắc', N'Đen, bạc', 35);

	-- Dữ liệu cho Máy tính bảng Lenovo Tab M10 Plus
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Màn hình', N'Màn hình IPS 10.3 inch', 36),
		(N'Chip', N'MediaTek Helio P22T', 36),
		(N'RAM', N'4GB', 36),
		(N'Dung lượng lưu trữ', N'64GB', 36),
		(N'Kết nối', N'Wi-Fi', 36),
		(N'Kích thước', N'24.42 x 15.76 x 0.83 cm', 36),
		(N'Trong lượng', N'Trong lượng 480g', 36),
		(N'Nhà sản xuất', N'Lenovo', 36),
		(N'Màu sắc', N'Đen, bạc', 36);

	-- Dữ liệu cho Máy tính bảng Huawei MatePad T10
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Màn hình', N'Màn hình IPS 9.7 inch', 37),
		(N'Chip', N'Kirin 710A', 37),
		(N'RAM', N'2GB', 37),
		(N'Dung lượng lưu trữ', N'32GB', 37),
		(N'Kết nối', N'Wi-Fi', 37),
		(N'Kích thước', N'24.4 x 15.8 x 0.8 cm', 37),
		(N'Trong lượng', N'Trong lượng 450g', 37),
		(N'Nhà sản xuất', N'Huawei', 37),
		(N'Màu sắc', N'Đen, bạc', 37);

	-- Dữ liệu cho Laptop Dell Inspiron 15
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Màn hình', N'Màn hình 15.6 inch FHD', 38),
		(N'Chip', N'Intel Core i5', 38),
		(N'RAM', N'8GB', 38),
		(N'Dung lượng lưu trữ', N'512GB SSD', 38),
		(N'Kết nối', N'Wi-Fi 6, Bluetooth 5.0', 38),
		(N'Kích thước', N'36.1 x 24.0 x 1.99 cm', 38),
		(N'Trong lượng', N'Trong lượng 1.8kg', 38),
		(N'Nhà sản xuất', N'Dell', 38),
		(N'Màu sắc', N'Đen, bạc', 38);

	-- Dữ liệu cho Laptop HP Pavilion 14
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Màn hình', N'Màn hình 14 inch FHD', 39),
		(N'Chip', N'Intel Core i5', 39),
		(N'RAM', N'8GB', 39),
		(N'Dung lượng lưu trữ', N'512GB SSD', 39),
		(N'Kết nối', N'Wi-Fi 5, Bluetooth 5.0', 39),
		(N'Kích thước', N'32.4 x 22.6 x 1.8 cm', 39),
		(N'Trong lượng', N'Trong lượng 1.6kg', 39),
		(N'Nhà sản xuất', N'HP', 39),
		(N'Màu sắc', N'Đen, bạc', 39);

	-- Dữ liệu cho Laptop Asus ZenBook 14
	INSERT INTO ProductSchema.ProductSpecifiactions (SpecType, Description, ProductId) 
	VALUES
		(N'Màn hình', N'Màn hình 14 inch FHD', 40),
		(N'Chip', N'Intel Core i7', 40),
		(N'RAM', N'16GB', 40),
		(N'Dung lượng lưu trữ', N'1TB SSD', 40),
		(N'Kết nối', N'Wi-Fi 6, Bluetooth 5.0', 40),
		(N'Kích thước', N'32.4 x 21.2 x 1.39 cm', 40),
		(N'Trong lượng', N'Trong lượng 1.4kg', 40),
		(N'Nhà sản xuất', N'Asus', 40),
		(N'Màu sắc', N'Đen, bạc', 40);



  

	-- Thêm dữ liệu vào bảng Color
	INSERT INTO ProductSchema.Color (ColorName) 
	VALUES
		(N'Màu đen'),
		(N'Màu trắng'),
		(N'Màu xanh'),
		(N'Màu đỏ'),
		(N'Màu vàng'),
		(N'Màu bạc'),
		(N'Màu hồng'),
		(N'Màu xám');

	


    
    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
    PRINT 'Có lỗi xảy ra: ' + ERROR_MESSAGE();
END CATCH;
