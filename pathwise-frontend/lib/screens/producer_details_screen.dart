import 'package:flutter/material.dart';
    import 'package:pathwise_frontend/models/producer.dart';

    class ProducerDetailsScreen extends StatelessWidget {
      final Producer producer;

      const ProducerDetailsScreen({super.key, required this.producer});

      @override
      Widget build(BuildContext context) {
        return Scaffold(
          appBar: AppBar(
            title: Text(producer.businessName),
          ),
          body: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Description: ${producer.description}'),
                // Add more details here
              ],
            ),
          ),
        );
      }
    }
