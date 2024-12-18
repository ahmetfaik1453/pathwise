import 'package:flutter/material.dart';
    import 'package:pathwise_frontend/api/api_service.dart';
    import 'package:pathwise_frontend/models/product.dart';

    class ProductProvider with ChangeNotifier {
      final ApiService apiService;
      List&lt;Product&gt; _products = [];

      ProductProvider(this.apiService);

      List&lt;Product&gt; get products =&gt; _products;

      Future&lt;void&gt; fetchProductsByProducer(int producerId) async {
        final response = await apiService.get('/api/products/producer/$producerId');
        _products = List&lt;Product&gt;.from(response.map((model) =&gt; Product.fromJson(model)));
        notifyListeners();
      }
    }
