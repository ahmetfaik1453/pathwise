import 'package:flutter/material.dart';
    import 'package:pathwise_frontend/api/api_service.dart';
    import 'package:pathwise_frontend/models/user.dart';
    import 'package:flutter_secure_storage/flutter_secure_storage.dart';
    import 'package:jwt_decoder/jwt_decoder.dart';

    class AuthProvider with ChangeNotifier {
      final ApiService apiService;
      final FlutterSecureStorage secureStorage;
      User? _user;

      AuthProvider(this.apiService, this.secureStorage);

      User? get user =&gt; _user;

      Future&lt;void&gt; login(String email, String password) async {
        final response = await apiService.post('/api/users/login', body: {'email': email, 'password': password});
        final token = response['token'];
        await secureStorage.write(key: 'jwt_token', value: token);
        
        Map&lt;String, dynamic&gt; decodedToken = JwtDecoder.decode(token);
        _user = User(
          id: decodedToken['id'],
          fullName: decodedToken['fullName'],
          email: decodedToken['email'],
          userType: decodedToken['userType'],
        );

        notifyListeners();
      }

      Future&lt;void&gt; logout() async {
        await secureStorage.delete(key: 'jwt_token');
        _user = null;
        notifyListeners();
      }

      Future&lt;bool&gt; isLoggedIn() async {
        final token = await secureStorage.read(key: 'jwt_token');
        if (token != null &amp;&amp; !JwtDecoder.isExpired(token)) {
          Map&lt;String, dynamic&gt; decodedToken = JwtDecoder.decode(token);
          _user = User(
            id: decodedToken['id'],
            fullName: decodedToken['fullName'],
            email: decodedToken['email'],
            userType: decodedToken['userType'],
          );
          return true;
        }
        return false;
      }
    }
