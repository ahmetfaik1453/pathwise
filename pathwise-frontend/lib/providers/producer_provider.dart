import 'package:flutter/material.dart';
    import 'package:pathwise_frontend/api/api_service.dart';
    import 'package:pathwise_frontend/models/producer.dart';

    class ProducerProvider with ChangeNotifier {
      final ApiService apiService;
      List&lt;Producer&gt; _producers = [];

      ProducerProvider(this.apiService);

      List&lt;Producer&gt; get producers =&gt; _producers;

      Future&lt;void&gt; fetchNearbyProducers(double lat, double lon, double radius) async {
        final response = await apiService.get('/api/producers?lat=$lat&amp;lon=$lon&amp;radius=$radius');
        _producers = List&lt;Producer&gt;.from(response.map((model) =&gt; Producer.fromJson(model)));
        notifyListeners();
      }
    }
