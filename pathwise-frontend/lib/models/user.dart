class User {
      final int id;
      final String fullName;
      final String email;
      final String userType;

      User({required this.id, required this.fullName, required this.email, required this.userType});

      factory User.fromJson(Map&lt;String, dynamic&gt; json) {
        return User(
          id: json['id'],
          fullName: json['full_name'],
          email: json['email'],
          userType: json['user_type'],
        );
      }
    }
