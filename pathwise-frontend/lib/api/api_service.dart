import 'dart:convert';
    import 'package:http/http.dart' as http;

    class ApiService {
      final String baseUrl;

      ApiService(this.baseUrl);

      Future&lt;dynamic&gt; get(String endpoint, {Map&lt;String, String&gt;? headers}) async {
        final response = await http.get(Uri.parse('$baseUrl$endpoint'), headers: headers);
        return _handleResponse(response);
      }

      Future&lt;dynamic&gt; post(String endpoint, {Map&lt;String, String&gt;? headers, body}) async {
        final response = await http.post(Uri.parse('$baseUrl$endpoint'), headers: headers, body: jsonEncode(body));
        return _handleResponse(response);
      }

      dynamic _handleResponse(http.Response response) {
        if (response.statusCode == 200) {
          return jsonDecode(response.body);
        } else {
          throw Exception('Failed to load data: ${response.statusCode}');
        }
      }
    }
