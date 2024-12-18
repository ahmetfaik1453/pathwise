import 'package:flutter/material.dart';

    class MessagesScreen extends StatefulWidget {
      const MessagesScreen({super.key});

      @override
      _MessagesScreenState createState() =&gt; _MessagesScreenState();
    }

    class _MessagesScreenState extends State&lt;MessagesScreen&gt; {
      @override
      Widget build(BuildContext context) {
        return Scaffold(
          appBar: AppBar(
            title: const Text('Messages'),
          ),
          body: const Center(
            child: Text('Messages Screen'),
          ),
        );
      }
    }
