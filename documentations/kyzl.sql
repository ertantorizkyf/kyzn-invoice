-- Table: Invoices
CREATE TABLE invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_no VARCHAR(50) NOT NULL UNIQUE,   -- format like INV-date-0000x
    date DATE NOT NULL,
    customer VARCHAR(100) NOT NULL,
    salesperson VARCHAR(100) NOT NULL,
    payment_type ENUM('CASH', 'CREDIT', 'NOTCASHORCREDIT') NOT NULL,
    notes TEXT NULL
);

-- Table: Products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image_url TEXT NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    cogs DECIMAL(12,2) NOT NULL,   -- cost of goods sold
    price DECIMAL(12,2) NOT NULL
);

-- Table: InvoiceProducts (junction table)
CREATE TABLE `invoice_products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `invoice_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `product_name` VARCHAR(100) NOT NULL,
  `qty` INT NOT NULL,
  `total_cogs` DECIMAL(12,2) NOT NULL,
  `total_price` DECIMAL(12,2) NOT NULL,
  CONSTRAINT `fk_invoice` FOREIGN KEY (`invoice_id`)
    REFERENCES `invoices` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_product` FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Helpful indexes
CREATE INDEX idx_invoice_date ON invoices(date);
CREATE INDEX idx_invoice_customer ON invoices(customer);
CREATE INDEX idx_invoiceproducts_invoice_id ON invoice_products(invoice_id);
CREATE INDEX idx_invoiceproducts_product_id ON invoice_products(product_id);

-- POPULATE PRODUCTS
INSERT INTO products (name, image_url, stock, cogs, price) VALUES
('iPhone', 'https://www.digimap.co.id/cdn/shop/files/iPhone_15_Pink_PDP_Image_Position-1__GBEN_863e22ef-a1c6-4031-8bf7-1ac9a9c5a086.jpg?v=1717731724', 100, 10000, 15000),
('MacBook', 'https://ibox.co.id/_next/image?url=https%3A%2F%2Fcdnpro.eraspace.com%2Fmedia%2Fcatalog%2Fproduct%2Fm%2Fa%2Fmacbook_pro_14-inch_m4_pro_or_max_chip_space_black_1_2.jpg&w=3840&q=45', 100, 30000, 45000);
