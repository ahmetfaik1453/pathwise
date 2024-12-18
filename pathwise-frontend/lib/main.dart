import 'package:flutter/material.dart';
    import 'package:pathwise_frontend/api/api_service.dart';
    import 'package:pathwise_frontend/providers/auth_provider.dart';
    import 'package:pathwise_frontend/providers/producer_provider.dart';
    import 'package:pathwise_frontend/providers/product_provider.dart';
    import 'package:pathwise_frontend/screens/home_screen.dart';
    import 'package:pathwise_frontend/screens/login_screen.dart';
    import 'package:pathwise_frontend/screens/search_results_screen.dart';
    import 'package:pathwise_frontend/screens/shopping_cart_screen.dart';
    import 'package:pathwise_frontend/screens/order_history_screen.dart';
    import 'package:pathwise_frontend/screens/messages_screen.dart';
    import 'package:pathwise_frontend/screens/settings_screen.dart';
    import 'package:pathwise_frontend/screens/forum_screen.dart';
    import 'package:pathwise_frontend/screens/blog_screen.dart';
    import 'package:provider/provider.dart';
    import 'package:flutter_secure_storage/flutter_secure_storage.dart';

    void main() {
      const secureStorage = FlutterSecureStorage();
      final apiService = ApiService('http://localhost:3000');

      runApp(
        MultiProvider(
          providers: [
            ChangeNotifierProvider(create: (context) =&gt; AuthProvider(apiService, secureStorage)),
            ChangeNotifierProvider(create: (context) =&gt; ProducerProvider(apiService)),
            ChangeNotifierProvider(create: (context) =&gt; ProductProvider(apiService)),
          ],
          child: const MyApp(),
        ),
      );
    }

    class MyApp extends StatelessWidget {
      const MyApp({super.key});

      @override
      Widget build(BuildContext context) {
        return MaterialApp(
          title: 'Pathwise',
          theme: ThemeData(
            primarySwatch: Colors.green,
          ),
          home: FutureBuilder&lt;bool&gt;(
            future: Provider.of&lt;AuthProvider&gt;(context, listen: false).isLoggedIn(),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.done) {
                return snapshot.data == true ? const HomeScreen() : const LoginScreen();
              } else {
                return const CircularProgressIndicator();
              }
            },
          ),
          routes: {
            '/login': (context) =&gt; const LoginScreen(),
            '/home': (context) =&gt; const HomeScreen(),
            '/search_results': (context) =&gt; SearchResultsScreen(products: context.read&lt;ProductProvider&gt;().products),
            '/shopping_cart': (context) =&gt; const ShoppingCartScreen(),
            '/order_history': (context) =&gt; const OrderHistoryScreen(),
            '/messages': (context) =&gt; const MessagesScreen(),
            '/settings': (context) =&gt; const SettingsScreen(),
            '/forum': (context) =&gt; const ForumScreen(),
            '/blog': (context) =&gt; const BlogScreen(),
          },
        );
      }
    }
