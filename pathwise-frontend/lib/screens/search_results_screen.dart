import 'package:flutter/material.dart';
    import 'package:pathwise_frontend/models/product.dart';
    import 'package:pathwise_frontend/widgets/product_card.dart';

    class SearchResultsScreen extends StatelessWidget {
      final List&lt;Product&gt; products;

      const SearchResultsScreen({super.key, required this.products});

      @override
      Widget build(BuildContext context) {
        return Scaffold(
          appBar: AppBar(
            title: const Text('Search Results'),
          ),
          body: ListView.builder(
            itemCount: products.length,
            itemBuilder: (context, index) {
              return ProductCard(product: products[index]);
            },
          ),
        );
      }
    }
