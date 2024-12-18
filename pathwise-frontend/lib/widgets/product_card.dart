import 'package:flutter/material.dart';
    import 'package:pathwise_frontend/models/product.dart';

    class ProductCard extends StatelessWidget {
      final Product product;

      const ProductCard({super.key, required this.product});

      @override
      Widget build(BuildContext context) {
        return Card(
          child: Column(
            children: [
              ListTile(
                title: Text(product.name),
                subtitle: Text('Price: \$${product.price}'),
              ),
              // Add more details or actions here
            ],
          ),
        );
      }
    }
