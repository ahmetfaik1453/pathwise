import 'package:flutter/material.dart';
    import 'package:pathwise_frontend/screens/map_screen.dart';
    import 'package:pathwise_frontend/screens/producers_list_screen.dart';
    import 'package:pathwise_frontend/screens/profile_screen.dart';

    class HomeScreen extends StatefulWidget {
      const HomeScreen({super.key});

      @override
      _HomeScreenState createState() =&gt; _HomeScreenState();
    }

    class _HomeScreenState extends State&lt;HomeScreen&gt; {
      int _selectedIndex = 0;

      static final List&lt;Widget&gt; _widgetOptions = &lt;Widget&gt;[
        const MapScreen(),
        const ProducersListScreen(),
        const ProfileScreen(),
      ];

      void _onItemTapped(int index) {
        setState(() {
          _selectedIndex = index;
        });
      }

      @override
      Widget build(BuildContext context) {
        return Scaffold(
          appBar: AppBar(
            title: const Text('Pathwise'),
          ),
          body: Center(
            child: _widgetOptions.elementAt(_selectedIndex),
          ),
          bottomNavigationBar: BottomNavigationBar(
            items: const &lt;BottomNavigationBarItem&gt;[
              BottomNavigationBarItem(
                icon: Icon(Icons.map),
                label: 'Map',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.list),
                label: 'Producers',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.person),
                label: 'Profile',
              ),
            ],
            currentIndex: _selectedIndex,
            selectedItemColor: Colors.green,
            onTap: _onItemTapped,
          ),
        );
      }
    }
