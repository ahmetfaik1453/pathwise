class Product {
      final int id;
      final String name;
      final String description;
      final double price;
      final int stock;

      Product({required this.id, required this.name, required this.description, required this.price, required this.stock});

      factory Product.fromJson(Map&lt;String, dynamic&gt; json) {
        return Product(
          id: json['id'],
          name: json['name'],
          description: json['description'],
          price: json['unit_price'],
          stock: json['stock_quantity'],
        );
      }
    }
