import 'package:flutter/material.dart';
    import 'package:pathwise_frontend/models/product.dart';

    class ProductDetailsScreen extends StatelessWidget {
      final Product product;

      const ProductDetailsScreen({super.key, required this.product});

      @override
      Widget build(BuildContext context) {
        return Scaffold(
          appBar: AppBar(
            title: Text(product.name),
          ),
          body: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Description: ${product.description}'),
                Text('Price: \$${product.price}'),
                Text('Stock: ${product.stock}'),
                // Add more details here
              ],
            ),
          ),
        );
      }
    }
