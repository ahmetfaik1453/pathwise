class Producer {
      final int id;
      final String businessName;
      final String description;
      final double latitude;
      final double longitude;

      Producer({required this.id, required this.businessName, required this.description, required this.latitude, required this.longitude});

      factory Producer.fromJson(Map&lt;String, dynamic&gt; json) {
        return Producer(
          id: json['id'],
          businessName: json['business_name'],
          description: json['description'],
          latitude: json['location']['coordinates'][1],
          longitude: json['location']['coordinates'][0],
        );
      }
    }
