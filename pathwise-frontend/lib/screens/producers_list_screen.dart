import 'package:flutter/material.dart';
    import 'package:pathwise_frontend/providers/producer_provider.dart';
    import 'package:provider/provider.dart';

    class ProducersListScreen extends StatefulWidget {
      const ProducersListScreen({super.key});

      @override
      _ProducersListScreenState createState() =&gt; _ProducersListScreenState();
    }

    class _ProducersListScreenState extends State&lt;ProducersListScreen&gt; {
      @override
      void initState() {
        super.initState();
        _fetchProducers();
      }

      Future&lt;void&gt; _fetchProducers() async {
        // Placeholder for fetching producers
        // final producerProvider = Provider.of&lt;ProducerProvider&gt;(context, listen: false);
        // await producerProvider.fetchNearbyProducers(latitude, longitude, radius);
      }

      @override
      Widget build(BuildContext context) {
        return Consumer&lt;ProducerProvider&gt;(
          builder: (context, producerProvider, child) {
            return ListView.builder(
              itemCount: producerProvider.producers.length,
              itemBuilder: (context, index) {
                final producer = producerProvider.producers[index];
                return ListTile(
                  title: Text(producer.businessName),
                  subtitle: Text(producer.description),
                  // Add more details or actions here
                );
              },
            );
          },
        );
      }
    }
