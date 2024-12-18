import 'package:flutter/material.dart';
    import 'package:google_maps_flutter/google_maps_flutter.dart';
    import 'package:pathwise_frontend/providers/producer_provider.dart';
    import 'package:provider/provider.dart';
    import 'package:geolocator/geolocator.dart';

    class MapScreen extends StatefulWidget {
      const MapScreen({super.key});

      @override
      _MapScreenState createState() =&gt; _MapScreenState();
    }

    class _MapScreenState extends State&lt;MapScreen&gt; {
      GoogleMapController? _controller;
      final Map&lt;String, Marker&gt; _markers = {};

      @override
      void initState() {
        super.initState();
        _determinePosition();
      }

      Future&lt;void&gt; _determinePosition() async {
        bool serviceEnabled;
        LocationPermission permission;

        serviceEnabled = await Geolocator.isLocationServiceEnabled();
        if (!serviceEnabled) {
          return Future.error('Location services are disabled.');
        }

        permission = await Geolocator.checkPermission();
        if (permission == LocationPermission.denied) {
          permission = await Geolocator.requestPermission();
          if (permission == LocationPermission.denied) {
            return Future.error('Location permissions are denied');
          }
        }

        if (permission == LocationPermission.deniedForever) {
          return Future.error('Location permissions are permanently denied, we cannot request permissions.');
        }

        Position position = await Geolocator.getCurrentPosition();
        _fetchNearbyProducers(position.latitude, position.longitude);
      }

      Future&lt;void&gt; _fetchNearbyProducers(double latitude, double longitude) async {
        final producerProvider = Provider.of&lt;ProducerProvider&gt;(context, listen: false);
        await producerProvider.fetchNearbyProducers(latitude, longitude, 10000); // 10km radius
        _updateMarkers(producerProvider.producers);
      }

      void _updateMarkers(List&lt;dynamic&gt; producers) {
        setState(() {
          _markers.clear();
          for (final producer in producers) {
            final marker = Marker(
              markerId: MarkerId(producer.id.toString()),
              position: LatLng(producer.latitude, producer.longitude),
              infoWindow: InfoWindow(
                title: producer.businessName,
                snippet: producer.description,
              ),
            );
            _markers[producer.id.toString()] = marker;
          }
        });
      }

      @override
      Widget build(BuildContext context) {
        return Scaffold(
          body: GoogleMap(
            onMapCreated: (controller) {
              setState(() {
                _controller = controller;
              });
            },
            initialCameraPosition: const CameraPosition(
              target: LatLng(37.7749, -122.4194), // Default location: San Francisco
              zoom: 10.0,
            ),
            markers: _markers.values.toSet(),
          ),
        );
      }
    }
