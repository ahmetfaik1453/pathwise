import 'package:flutter/material.dart';

    class ForumScreen extends StatefulWidget {
      const ForumScreen({super.key});

      @override
      _ForumScreenState createState() =&gt; _ForumScreenState();
    }

    class _ForumScreenState extends State&lt;ForumScreen&gt; {
      @override
      Widget build(BuildContext context) {
        return Scaffold(
          appBar: AppBar(
            title: const Text('Forum'),
          ),
          body: const Center(
            child: Text('Forum Screen'),
          ),
        );
      }
    }
