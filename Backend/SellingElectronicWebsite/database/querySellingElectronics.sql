create database SellingElectronics
go
use SellingElectronics
go
create schema ProductSchema
go
create schema ChatingSchema
go
create schema UserSchema
go
create schema AccountSchema
go
create schema StoreSchema
go
create schema SalesSchema
go
create schema OrderSchema
GO
BEGIN TRY
    BEGIN TRANSACTION;
 --dbo schema
	CREATE TABLE Address(
			AddressId INT IDENTITY,
			Province NVARCHAR(100) NOT NULL,
			District NVARCHAR(100) NOT NULL,
			Commune NVARCHAR(100) NOT NULL,
			Street NVARCHAR(100) NOT NULL,
			NumberHouse NVARCHAR(50) NOT NULL,
			CONSTRAINT PK_Address PRIMARY KEY(AddressId)
		)
-- store schema
	CREATE TABLE StoreSchema.Stores(
			StoreId INT IDENTITY,
			StoreName NVARCHAR(200) UNIQUE,
			AddressId INT,
			CONSTRAINT FK_Store_Address FOREIGN KEY(AddressId) 
				REFERENCES dbo.ADDRESS(AddressId) 
				ON UPDATE CASCADE 
				ON DELETE SET NULL,
			CONSTRAINT PK_Store PRIMARY KEY(StoreId)
			)

	CREATE TABLE StoreSchema.Warehouses(
				WarehouseId INT IDENTITY,
				WarehouseName NVARCHAR(200) UNIQUE,
				AddressId INT ,
				CONSTRAINT FK_WarehouseId_Address FOREIGN KEY(AddressId) 
				REFERENCES dbo.Address(AddressId) 
				ON UPDATE CASCADE 
				ON DELETE SET NULL,
				CONSTRAINT PK_Warehouse PRIMARY KEY(WarehouseId)
				)

	
-- user schema

	CREATE TABLE UserSchema.Customers(
			CustomerId INT IDENTITY,
			FullName NVARCHAR(150),
			Email VARCHAR(150),
			PhoneNumber VARCHAR(12),
			AddressId INT,
			CONSTRAINT FK_Customer_Address FOREIGN KEY(AddressId) 
				REFERENCES dbo.Address(AddressId) 
				ON UPDATE CASCADE 
				ON DELETE SET NULL,
			CONSTRAINT PK_Customer PRIMARY KEY(CustomerId)
			)

	-- sổ địa chỉ
	CREATE TABLE UserSchema.AddressCustomer(
			AddressCusId INT IDENTITY,
			Province NVARCHAR(100) NOT NULL,
			District NVARCHAR(100) NOT NULL,
			Commune NVARCHAR(100) NOT NULL,
			Street NVARCHAR(100) NOT NULL,
			NumberHouse NVARCHAR(50) NOT NULL,
			PhoneNumber NVARCHAR(12) NOT NULL,
			CustomerId INT,
			CONSTRAINT FK_AddressCustomer_Customer FOREIGN KEY(CustomerId) 
				REFERENCES UserSchema.Customers(CustomerId) 
				ON UPDATE CASCADE 
				ON DELETE CASCADE,
			CONSTRAINT PK_Address PRIMARY KEY(AddressCusId)
		)
	CREATE TABLE UserSchema.Department(
			DepartmentId INT IDENTITY,
			DepartmentName NVARCHAR(150) NOT NULL UNIQUE,
			CONSTRAINT PK_Department PRIMARY KEY(DepartmentId)
			)

	CREATE TABLE UserSchema.Position(
			PositionId INT IDENTITY,
			PositionName NVARCHAR(150) NOT NULL UNIQUE,
			DepartmentId INT ,
			CONSTRAINT PK_Position PRIMARY KEY(PositionId),
			CONSTRAINT FK_Position_Department FOREIGN KEY(DepartmentId) 
				REFERENCES UserSchema.Department(DepartmentId)  
				ON UPDATE CASCADE 
				ON DELETE SET NULL
			)

	CREATE TABLE UserSchema.Employees(
			EmployeeId INT IDENTITY,
			FullName NVARCHAR(150) NOT NULL,
			Email VARCHAR(150) NOT NULL,
			PhoneNumber VARCHAR(12) NOT NULL,
			PositionId INT ,
			StoreId INT,
			AddressId INT ,
			CONSTRAINT FK_Employee_Address FOREIGN KEY(AddressId) 
				REFERENCES dbo.Address(AddressId) 
				ON UPDATE NO ACTION 
				ON DELETE NO ACTION,
			CONSTRAINT FK_Employee_Position FOREIGN KEY(PositionId) 
				REFERENCES dbo.Address(AddressId) 
				ON UPDATE NO ACTION 
				ON DELETE SET NULL,
			CONSTRAINT FK_Employee_Store FOREIGN KEY(StoreId) 
				REFERENCES StoreSchema.Stores(StoreId) 
				ON UPDATE NO ACTION 
				ON DELETE NO ACTION,
			CONSTRAINT PK_Employee PRIMARY KEY(EmployeeId)
			)
	


	

-- account schema
	CREATE TABLE AccountSchema.AccountCustomer(
			AccCustomerId UNIQUEIDENTIFIER DEFAULT NEWID(),
			CustomerId INT NOT NULL,
			Email varchar(200) not null,
			Password varchar(MAX) NOT NULL,
			CONSTRAINT PK_AccountCustomer PRIMARY KEY(AccCustomerId),
			CONSTRAINT FK_AccountCustomer_Customer FOREIGN KEY(CustomerId) REFERENCES UserSchema.Customers(CustomerId) 
				ON UPDATE CASCADE 
				ON DELETE CASCADE
			)
	CREATE TABLE AccountSchema.RefreshTokenCustomer(
					RefreshTokenCustomerId UNIQUEIDENTIFIER DEFAULT NEWID() Primary key,
					CustomerId INT NOT NULL,
					Token VARCHAR(1000),
					JwtId VARCHAR(200),
					IsUsed bit,
					IsRevoked bit,
					IssuedAt DATETIME,
					ExpiredAt DATETIME
					CONSTRAINT FK_RefreshTokenCustomer_Customer FOREIGN KEY(CustomerId) REFERENCES UserSchema.Customers(CustomerId) 
)
	CREATE TABLE AccountSchema.Roles(
			RolesId UNIQUEIDENTIFIER DEFAULT NEWID(),
			RolesName VARCHAR(100) NOT NULL UNIQUE,
			CONSTRAINT PK_ROLES PRIMARY KEY(RolesId)
			)

	CREATE TABLE AccountSchema.TypeAccount(
			TypeAccId  UNIQUEIDENTIFIER DEFAULT NEWID(),
			TypeAccName VARCHAR(100) NOT NULL UNIQUE,
			CONSTRAINT PK_TypeAccount PRIMARY KEY(TypeAccId),
			)

	CREATE TABLE AccountSchema.TypeAccRoles(
			TypeAccId  UNIQUEIDENTIFIER,
			RolesId UNIQUEIDENTIFIER,
			CONSTRAINT PK_TypeAccRoles PRIMARY KEY(TypeAccId, RolesId),
			CONSTRAINT FK_TypeAccRoles_ROLES FOREIGN KEY(RolesId) REFERENCES AccountSchema.Roles(RolesId) 
				ON UPDATE CASCADE 
				ON DELETE CASCADE,
			CONSTRAINT FK_TypeAccRoles_TypeAccount FOREIGN KEY(TypeAccId) REFERENCES AccountSchema.TypeAccount(TypeAccId) 
				ON UPDATE CASCADE 
				ON DELETE CASCADE
			)
	CREATE TABLE AccountSchema.AccountEmp(
			AccEmpId UNIQUEIDENTIFIER DEFAULT NEWID(),
			EmployeeId INT NOT NULL,
			Email varchar(200) not null,
			Password varchar(MAX) NOT NULL,
			TypeAccId UNIQUEIDENTIFIER,
			CONSTRAINT PK_AccountEmp PRIMARY KEY(AccEmpId),
			CONSTRAINT FK_AccountCustomer_Employee FOREIGN KEY(EmployeeId) REFERENCES UserSchema.Employees(EmployeeId) 
				ON UPDATE CASCADE 
				ON DELETE CASCADE,
			CONSTRAINT FK_AccountEmp_TypeAccount FOREIGN KEY(TypeAccId) REFERENCES AccountSchema.TypeAccount(TypeAccId) 
				ON UPDATE CASCADE 
				ON DELETE SET NULL
			)

	CREATE TABLE AccountSchema.RefreshTokenEmployee(
					RefreshTokenEmployeeId UNIQUEIDENTIFIER DEFAULT NEWID() Primary key,
					AccEmpId UNIQUEIDENTIFIER NOT NULL,
					Token VARCHAR(1000),
					JwtId VARCHAR(200),
					IsUsed bit,
					IsRevoked bit,
					IssuedAt DATETIME,
					ExpiredAt DATETIME
					CONSTRAINT FK_RefreshTokenEmployee_AccountEmp FOREIGN KEY(AccEmpId) REFERENCES AccountSchema.AccountEmp(AccEmpId) 
)
-- product shcema

	CREATE TABLE ProductSchema.Categories(
			CategoryId INT IDENTITY,
			CategoryName NVARCHAR(200) UNIQUE,
			CategoryIcon NVARCHAR(200) UNIQUE,
			CONSTRAINT PK_Category PRIMARY KEY(CategoryId)
			)


	CREATE TABLE ProductSchema.Products(
			ProductId INT IDENTITY,
			ProductName NVARCHAR(200) NOT NULL UNIQUE,
			Brand NVARCHAR(200) NOT NULL,
			Series NVARCHAR(200) NOT NULL,
			Price MONEY NOT NULL,
			CategoryId INT,
			MainImg VARCHAR(500),
			CONSTRAINT FK_Products_Categories FOREIGN KEY(CategoryId) REFERENCES ProductSchema.Categories(CategoryId) 
				ON UPDATE CASCADE 
				ON DELETE SET NULL,
			CONSTRAINT PK_Products PRIMARY KEY(ProductId)
			)

	CREATE TABLE ProductSchema.ProductSpecifiactions(
			SpecifiactionsId INT IDENTITY,
			SpecType NVARCHAR(300) NOT NULL,
			Description NVARCHAR(1500) NOT NULL,
			ProductId INT NOT NULL,
			CONSTRAINT FK_ProductSpecifiactions_Products FOREIGN KEY(ProductId) REFERENCES ProductSchema.Products(ProductId) 
				ON UPDATE CASCADE 
				ON DELETE CASCADE,
			CONSTRAINT PK_ProductSpecifiactions PRIMARY KEY(SpecifiactionsId)
	)
	CREATE TABLE ProductSchema.Color(
			ColorId INT IDENTITY,
			ColorName NVARCHAR(300) UNIQUE,
			CONSTRAINT PK_Color PRIMARY KEY(ColorId)
			)

	CREATE TABLE ProductSchema.ImageProduct(
			ImgId INT IDENTITY,
			ImgLink VARCHAR(2000) NOT NULL,
			ColorId INT,
			ProductId INT NOT NULL,
			CONSTRAINT FK_ImageProduct_Products FOREIGN KEY(ProductId) REFERENCES ProductSchema.Products(ProductId) 
				ON UPDATE CASCADE 
				ON DELETE CASCADE,
			CONSTRAINT FK_ImageProduct_Color FOREIGN KEY(ColorId) REFERENCES ProductSchema.Color(ColorId) 
				ON UPDATE CASCADE 
				ON DELETE SET NULL,
			CONSTRAINT PK_ImageProduct PRIMARY KEY(ImgId)
			)

	CREATE TABLE ProductSchema.ProductDetails (
			DetailsID INT IDENTITY,
			ProductID INT NOT NULL,
			Detail NVARCHAR(MAX) NOT NULL,
			CreatedAt DATETIME  DEFAULT GETDATE(),
			CONSTRAINT PK_ProductDetails PRIMARY KEY(DetailsID),
			CONSTRAINT FK_ProductDetails_Product FOREIGN KEY (ProductID) REFERENCES ProductSchema.Products(ProductID)  
				ON UPDATE CASCADE 
				ON DELETE CASCADE
	)



	CREATE TABLE ProductSchema.Ratings (
			RatingId INT IDENTITY,
			CustomerId INT,
			ProductId INT NOT NULL,
			RatingValue INT CHECK (RatingValue BETWEEN 1 AND 5),
			RatingDetail NVARCHAR(MAX),
			RatingDate DATETIME DEFAULT GETDATE(),
			CONSTRAINT FK_Ratings_Customers FOREIGN KEY (CustomerId) REFERENCES UserSchema.Customers(CustomerId) 
				ON UPDATE CASCADE 
				ON DELETE SET NULL,
			CONSTRAINT FK_Ratings_Products FOREIGN KEY (ProductId) REFERENCES ProductSchema.Products(ProductId) 
				ON UPDATE CASCADE 
				ON DELETE CASCADE,
			CONSTRAINT PK_Ratings PRIMARY KEY(RatingId)
	)

	CREATE TABLE ProductSchema.Comments (
			CommentId INT IDENTITY,
			CustomerId INT,
			ToCustomerId INT,
			ProductId INT NOT NULL,
			CommentDetail NVARCHAR(MAX) NOT NULL,
			CommentDate DATETIME DEFAULT GETDATE(),
			ParentId INT NULL,
			CONSTRAINT FK_Comments_Customers FOREIGN KEY (CustomerId) REFERENCES UserSchema.Customers(CustomerId) 
				ON UPDATE CASCADE 
				ON DELETE SET NULL,
			CONSTRAINT FK_Comments_Products FOREIGN KEY (ProductId) REFERENCES ProductSchema.Products(ProductId) 
				ON UPDATE CASCADE 
				ON DELETE CASCADE,
			CONSTRAINT FK_Comments_Comments FOREIGN KEY (ParentId) REFERENCES ProductSchema.Comments(CommentId) 
				ON UPDATE NO ACTION 
				ON DELETE NO ACTION,
			CONSTRAINT	FK_Comments_Customer_replyToId FOREIGN KEY (ToCustomerId) references UserSchema.customers(CustomerId),
			CONSTRAINT PK_Comments PRIMARY KEY(CommentId)
	)



-- order schema
	-- giỏ hàng // cho vào giỏ hàng
	CREATE TABLE OrderSchema.ShoppingCart(
			CustomerId INT NOT NULL,
			ProductId INT NOT NULL,
			Amount INT NOT NULL CHECK(Amount > 0),
			ColorId INT,
			CONSTRAINT FK_ShoppingCart_Customers FOREIGN KEY (CustomerId) REFERENCES UserSchema.Customers(CustomerId) 
				ON UPDATE CASCADE 
				ON DELETE CASCADE,
			CONSTRAINT FK_ShoppingCart_Products FOREIGN KEY (ProductId) REFERENCES ProductSchema.Products(ProductId) 
				ON UPDATE CASCADE 
				ON DELETE CASCADE,
			CONSTRAINT FK_ShoppingCart_Color
				FOREIGN KEY (ColorId) REFERENCES ProductSchema.Color(ColorId),
				ON UPDATE CASCADE 
				ON DELETE CASCADE,
			CONSTRAINT PK_ShoppingCart PRIMARY KEY(CustomerId, ProductId)

		)


	CREATE TABLE OrderSchema.Orders(
			OrderId INT IDENTITY,
			CustomerId INT,
			EmployeeId INT,-- if order is pending, it will not employeeId
			OdertDate DATETIME ,
			OdertDate DATETIME ,
			StoreId INT,
			Status NVARCHAR(20) NOT NULL,--  pending,  cancel, complete
			OrderType NVARCHAR(10) CHECK(OrderType ='ONLINE' OR OrderType = 'OFFLINE'), 
			CONSTRAINT FK_Orders_Customers FOREIGN KEY (CustomerId) REFERENCES UserSchema.Customers(CustomerId) 
				ON UPDATE CASCADE 
				ON DELETE SET NULL,
			CONSTRAINT FK_Orders_Employees FOREIGN KEY (EmployeeId) REFERENCES UserSchema.Employees(EmployeeId),
			CONSTRAINT FK_Orders_Store FOREIGN KEY (StoreId) REFERENCES StoreSchema.Stores(StoreId),
			CONSTRAINT PK_Orders PRIMARY KEY(OrderId)
			)

	CREATE TABLE OrderSchema.ProductOrder(
			ProductOrderId INT IDENTITY,
			OrderId INT,
			ProductId INT,
			Amount INT NOT NULL CHECK(Amount > 0),
			UntilPrice Money NOT NULL,
			CONSTRAINT FK_ProductOrder_Orders FOREIGN KEY (OrderId) REFERENCES OrderSchema.Orders(OrderId) 
				ON UPDATE CASCADE 
				ON DELETE SET NULL,
			CONSTRAINT FK_ProductOrder_Products FOREIGN KEY (ProductId) REFERENCES ProductSchema.Products(ProductId) 
				ON UPDATE CASCADE 
				ON DELETE SET NULL,
			CONSTRAINT PK_ProductOrder PRIMARY KEY(ProductOrderId)
			)


	CREATE TABLE OrderSchema.OrderPending(
			OrderPendingId INT IDENTITY,
			CustomerId INT ,
			EmployeeId INT ,
			OdertDate DATETIME DEFAULT GETDATE(),
			Status nvarchar(50),
			CONSTRAINT FK_OrderPending_Customers FOREIGN KEY (CustomerId) REFERENCES UserSchema.Customers(CustomerId) 
				ON UPDATE CASCADE 
				ON DELETE SET NULL,
			CONSTRAINT FK_OrderPending_Employees FOREIGN KEY (EmployeeId) REFERENCES UserSchema.Employees(EmployeeId),
			CONSTRAINT PK_OrderPending PRIMARY KEY(OrderPendingId)
			)
	CREATE TABLE OrderSchema.ProductOrderPending(
			ProductOrderPendingId INT IDENTITY,
			OrderPendingId INT ,
			ProductId INT,
			Amount INT NOT NULL CHECK(Amount > 0),
			CONSTRAINT FK_ProductOrderPending_Customers FOREIGN KEY (OrderPendingId) REFERENCES OrderSchema.OrderPending(OrderPendingId) 
				ON UPDATE CASCADE 
				ON DELETE SET NULL,
			CONSTRAINT FK_ProductOrderPending_Products FOREIGN KEY (ProductId) REFERENCES ProductSchema.Products(ProductId) 
				ON UPDATE CASCADE 
				ON DELETE SET NULL,
			CONSTRAINT PK_ProductOrderPending PRIMARY KEY(ProductOrderPendingId)
			)
-- sales schema
	CREATE TABLE SalesSchema.Sales(
			SaleId INT IDENTITY,
			ProductId INT NOT NULL,
			NumProduct INT,
			StartAt DATETIME NOT NULL,
			EndAt DATETIME NOT NULL,
			PercentSale INT NOT NULL CHECK(PercentSale >= 0 AND PercentSale <= 100),
			NumProductSold INT,
			CONSTRAINT FK_Sales_Products FOREIGN KEY (ProductId) REFERENCES ProductSchema.Products(ProductId) 
				ON UPDATE CASCADE 
				ON DELETE CASCADE,
			CONSTRAINT PK_Sales PRIMARY KEY(SaleId)
	)
-- chating schema

	CREATE TABLE ChatingSchema.Messages(
			MessagesId INT IDENTITY,
			CustomerId INT,
			EmployeeId INT,
			MessageText NVARCHAR(MAX),
			PersonSend NVARCHAR(10) CHECK(PersonSend ='EMPLOYEE' OR PersonSend = 'CUSTOMER'),
			ChatTime DATETIME DEFAULT GETDATE(),
			CONSTRAINT FK_Chats_Customers FOREIGN KEY (CustomerId) REFERENCES UserSchema.Customers(CustomerId) 
				ON UPDATE CASCADE 
				ON DELETE SET NULL,
			CONSTRAINT FK_Chats_Employees FOREIGN KEY (EmployeeId) REFERENCES UserSchema.Employees(EmployeeId),
			CONSTRAINT PK_Chats PRIMARY KEY(MessagesId)
			)

 --dbo
	CREATE TABLE dbo.Images (
			ImageId INT IDENTITY,
			ImagePath NVARCHAR(500) NOT NULL,
			RatingId INT NOT NULL,
			CONSTRAINT FK_Images_Ratings FOREIGN KEY (RatingId) REFERENCES ProductSchema.Ratings(RatingId) 
				ON UPDATE CASCADE 
				ON DELETE CASCADE,
			CONSTRAINT PK_Images PRIMARY KEY(ImageId)


    ) 

-- warehouse_store, warehouse_store_product
		CREATE TABLE StoreSchema.WarehousesExport(
				WarehousesExportId INT IDENTITY,
				WarehouseId INT ,
				StoreId INT ,
				timeAt datetime NOT NULL,
				employeeId INT,
				CONSTRAINT FK_WarehousesExport_Employee FOREIGN KEY(employeeId) 
					REFERENCES UserSchema.Employees(EmployeeId) 
					ON UPDATE CASCADE 
					ON DELETE SET NULL,
				CONSTRAINT FK_WarehousesExport_Stores FOREIGN KEY(StoreId) 
					REFERENCES StoreSchema.Stores(StoreId),
				CONSTRAINT FK_WarehousesExport_Warehouses FOREIGN KEY(WarehouseId) 
					REFERENCES StoreSchema.Warehouses(WarehouseId) 
					ON UPDATE NO ACTION 
					ON DELETE NO ACTION,
				CONSTRAINT PK_WarehousesExport PRIMARY KEY(WarehousesExportId)
				)
		CREATE TABLE StoreSchema.WarehousesExport_product(
				WarehousesExport_productId INT IDENTITY,
				WarehousesExportId INT,
				ProductId INT,
				amount INT NOT NULL,
				CONSTRAINT FK_WarehousesExport_product_Products FOREIGN KEY(ProductId) 
					REFERENCES ProductSchema.Products(ProductId) 
					ON UPDATE CASCADE 
					ON DELETE SET NULL,
				CONSTRAINT FK_WarehousesExport_product_WarehousesExport FOREIGN KEY(WarehousesExportId) 
					REFERENCES StoreSchema.WarehousesExport(WarehousesExportId) 
					ON UPDATE CASCADE 
					ON DELETE SET NULL,
				CONSTRAINT PK_WarehousesExport_product PRIMARY KEY(WarehousesExport_productId)
				)
		CREATE TABLE StoreSchema.StoreImport(
				StoreImportId INT IDENTITY,
				WarehousesExportId INT,
				StoreId INT,
				timeAt datetime NOT NULL,
				employeeId INT,
				Status bit NOT NULL,
				CONSTRAINT FK_StoreImport_Employee FOREIGN KEY(employeeId) 
					REFERENCES UserSchema.Employees(EmployeeId) 
					ON UPDATE CASCADE 
					ON DELETE SET NULL,
				CONSTRAINT FK_StoreImport_Stores FOREIGN KEY(StoreId) 
					REFERENCES StoreSchema.Stores(StoreId),
				CONSTRAINT FK_StoreImport_WarehousesExport FOREIGN KEY(WarehousesExportId) 
					REFERENCES StoreSchema.WarehousesExport(WarehousesExportId) 
					ON UPDATE NO ACTION 
					ON DELETE NO ACTION,
				CONSTRAINT PK_StoreImport PRIMARY KEY(StoreImportId)
				)
--StoreSchema
	-- importWarehouse, importWarehouse_product
			CREATE TABLE StoreSchema.WarehousesProduct(
						WarehousesProductId INT IDENTITY,
						WarehouseId INT,
						ProductId INT,
						Amount INT CHECK(Amount > 0),
						CONSTRAINT Unique_WarehouseId_ProductId UNIQUE(WarehouseId, ProductId),
						CONSTRAINT FK_WarehousesProduct_Products FOREIGN KEY(ProductId) REFERENCES ProductSchema.Products(ProductId),
						CONSTRAINT FK_WarehousesProduct_Warehouses FOREIGN KEY(WarehouseId) REFERENCES StoreSchema.Warehouses(WarehouseId),
						CONSTRAINT PK_WarehousesProduct PRIMARY KEY(WarehousesProductId)
		)

		CREATE TABLE StoreSchema.StoresProduct(
						StoresProductId INT IDENTITY,
						StoreId INT,
						ProductId INT,
						Amount INT CHECK(Amount > 0),
						CONSTRAINT Unique_StoreIdId_ProductId UNIQUE(StoreId, ProductId),
						CONSTRAINT FK_StoresProduct_Products FOREIGN KEY(ProductId) REFERENCES ProductSchema.Products(ProductId),
						CONSTRAINT FK_StoresProduct_Stores FOREIGN KEY(StoreId) REFERENCES StoreSchema.Stores(StoreId),
						CONSTRAINT PK_StoresProduct PRIMARY KEY(StoresProductId)
		)
		CREATE TABLE StoreSchema.WarehousesProduct(
						WarehousesProductId INT IDENTITY,
						WarehouseId INT not null,
						ProductId INT not null,
						ColorId INT not null,
						Amount INT CHECK(Amount > 0),
						CONSTRAINT FK_WarehousesProduct_Color FOREIGN KEY (ColorId) REFERENCES ProductSchema.Color(ColorId),
						CONSTRAINT Unique_WarehouseId_ProductId UNIQUE(WarehouseId, ProductId, ColorId),
						CONSTRAINT FK_WarehousesProduct_Products FOREIGN KEY(ProductId) REFERENCES ProductSchema.Products(ProductId),
						CONSTRAINT FK_WarehousesProduct_Warehouses FOREIGN KEY(WarehouseId) REFERENCES StoreSchema.Warehouses(WarehouseId),
						CONSTRAINT PK_WarehousesProduct PRIMARY KEY(WarehousesProductId)
		)

		CREATE TABLE StoreSchema.StoresProduct(
						StoresProductId INT IDENTITY,
						StoreId INT not null,
						ProductId INT not null,
						ColorId INT not null,
						Amount INT CHECK(Amount > 0),
						CONSTRAINT FK_StoresProduct_Color FOREIGN KEY (ColorId) REFERENCES ProductSchema.Color(ColorId),
						CONSTRAINT Unique_StoreIdId_ProductId UNIQUE(StoreId, ProductId,ColorId),
						CONSTRAINT FK_StoresProduct_Products FOREIGN KEY(ProductId) REFERENCES ProductSchema.Products(ProductId),
						CONSTRAINT FK_StoresProduct_Stores FOREIGN KEY(StoreId) REFERENCES StoreSchema.Stores(StoreId),
						CONSTRAINT PK_StoresProduct PRIMARY KEY(StoresProductId)
		)
    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
   SELECT 
        ERROR_NUMBER() AS ErrorNumber,
        ERROR_SEVERITY() AS ErrorSeverity,
        ERROR_STATE() AS ErrorState,
        ERROR_PROCEDURE() AS ErrorProcedure, -- The name of the stored procedure or trigger where the error occurred
        ERROR_LINE() AS ErrorLine,           -- The line number where the error occurred
        ERROR_MESSAGE() AS ErrorMessage;     -- The actual error message


        ROLLBACK TRANSACTION;

    
END CATCH;