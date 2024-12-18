import 'package:flutter/material.dart';
    import 'package:pathwise_frontend/providers/auth_provider.dart';
    import 'package:provider/provider.dart';

    class ProfileScreen extends StatelessWidget {
      const ProfileScreen({super.key});

      @override
      Widget build(BuildContext context) {
        final authProvider = Provider.of&lt;AuthProvider&gt;(context);
        final user = authProvider.user;

        return Scaffold(
          appBar: AppBar(
            title: const Text('Profile'),
          ),
          body: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('Name: ${user?.fullName ?? 'Not logged in'}'),
                Text('Email: ${user?.email ?? 'Not logged in'}'),
                Text('Type: ${user?.userType ?? 'Not logged in'}'),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () async {
                    await authProvider.logout();
                    Navigator.pushReplacementNamed(context, '/login');
                  },
                  child: const Text('Logout'),
                ),
              ],
            ),
          ),
        );
      }
    }
