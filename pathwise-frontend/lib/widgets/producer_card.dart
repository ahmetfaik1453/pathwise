import 'package:flutter/material.dart';
    import 'package:pathwise_frontend/models/producer.dart';

    class ProducerCard extends StatelessWidget {
      final Producer producer;

      const ProducerCard({super.key, required this.producer});

      @override
      Widget build(BuildContext context) {
        return Card(
          child: Column(
            children: [
              ListTile(
                title: Text(producer.businessName),
                subtitle: Text(producer.description),
              ),
              // Add more details or actions here
            ],
          ),
        );
      }
    }
