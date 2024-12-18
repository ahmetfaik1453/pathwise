import 'package:flutter/material.dart';

    class SettingsScreen extends StatefulWidget {
      const SettingsScreen({super.key});

      @override
      _SettingsScreenState createState() =&gt; _SettingsScreenState();
    }

    class _SettingsScreenState extends State&lt;SettingsScreen&gt; {
      @override
      Widget build(BuildContext context) {
        return Scaffold(
          appBar: AppBar(
            title: const Text('Settings'),
          ),
          body: const Center(
            child: Text('Settings Screen'),
          ),
        );
      }
    }
