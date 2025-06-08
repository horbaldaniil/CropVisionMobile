import { StyleSheet } from 'react-native';

const authStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    padding: 32,
  },
  topText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    marginBottom: 6,
  },
  bottomText: {
    fontSize: 14,
    alignSelf: 'center',
    marginBottom: 32,
  },
  inputTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 12,
    paddingRight: 40,
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: '300',
    borderColor: '#e9eef3',
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passwordContainer: {
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
  },
  loginButton: {
    backgroundColor: '#4CAE4F',
    borderRadius: 10,
    paddingVertical: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  orText: {
    marginHorizontal: 8,
    color: '#64748B',
  },
  forgotPasswordText: {
    color: '#4CAE4F',
  },
  googleButton: {
    borderRadius: 10,
  },
  registerContainer: {
    marginTop: 15,
    alignItems: 'center',
    gap: 5,
  },
  registerText: {
    textAlign: 'center',
  },
  registerLink: {
    textAlign: 'center',
    color: '#4CAE4F',
  },
});

export default authStyles;
