import 'package:flutter/material.dart';

    class OrderHistoryScreen extends StatefulWidget {
      const OrderHistoryScreen({super.key});

      @override
      _OrderHistoryScreenState createState() =&gt; _OrderHistoryScreenState();
    }

    class _OrderHistoryScreenState extends State&lt;OrderHistoryScreen&gt; {
      @override
      Widget build(BuildContext context) {
        return Scaffold(
          appBar: AppBar(
            title: const Text('Order History'),
          ),
          body: const Center(
            child: Text('Order History Screen'),
          ),
        );
      }
    }
