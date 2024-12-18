import 'package:flutter/material.dart';
    import 'package:provider/provider.dart';
    import 'package:pathwise_frontend/providers/auth_provider.dart';
    import 'package:pathwise_frontend/screens/home_screen.dart';

    class LoginScreen extends StatefulWidget {
      const LoginScreen({super.key});

      @override
      _LoginScreenState createState() =&gt; _LoginScreenState();
    }

    class _LoginScreenState extends State&lt;LoginScreen&gt; {
      final _formKey = GlobalKey&lt;FormState&gt;();
      String _email = '';
      String _password = '';

      void _submit() async {
        final form = _formKey.currentState;
        if (form != null &amp;&amp; form.validate()) {
          form.save();
          try {
            await Provider.of&lt;AuthProvider&gt;(context, listen: false).login(_email, _password);
            Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) =&gt; HomeScreen()));
          } catch (e) {
            ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Login failed: ${e.toString()}')));
          }
        }
      }

      @override
      Widget build(BuildContext context) {
        return Scaffold(
          appBar: AppBar(
            title: const Text('Login'),
          ),
          body: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Form(
              key: _formKey,
              child: Column(
                children: [
                  TextFormField(
                    decoration: const InputDecoration(labelText: 'Email'),
                    keyboardType: TextInputType.emailAddress,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter your email';
                      }
                      return null;
                    },
                    onSaved: (value) =&gt; _email = value!,
                  ),
                  TextFormField(
                    decoration: const InputDecoration(labelText: 'Password'),
                    obscureText: true,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter your password';
                      }
                      return null;
                    },
                    onSaved: (value) =&gt; _password = value!,
                  ),
                  const SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: _submit,
                    child: const Text('Login'),
                  ),
                ],
              ),
            ),
          ),
        );
      }
    }
