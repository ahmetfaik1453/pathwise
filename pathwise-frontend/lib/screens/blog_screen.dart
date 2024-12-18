import 'package:flutter/material.dart';

    class BlogScreen extends StatefulWidget {
      const BlogScreen({super.key});

      @override
      _BlogScreenState createState() =&gt; _BlogScreenState();
    }

    class _BlogScreenState extends State&lt;BlogScreen&gt; {
      @override
      Widget build(BuildContext context) {
        return Scaffold(
          appBar: AppBar(
            title: const Text('Blog'),
          ),
          body: const Center(
            child: Text('Blog Screen'),
          ),
        );
      }
    }
