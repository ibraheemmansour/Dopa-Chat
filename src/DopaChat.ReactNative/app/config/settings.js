import { Dimensions } from 'react-native';

var Settings = {
	WindowWidth : Dimensions.get("window").width,
	WindowHeight: Dimensions.get("window").height,
	ExpiryDays: 1,
	SplashScreenTime: 1000,
	Language: "en",
	SwipeDirections: {
		SWIPE_UP: 'SWIPE_UP',
		SWIPE_DOWN: 'SWIPE_DOWN',
		SWIPE_LEFT: 'SWIPE_LEFT',
		SWIPE_RIGHT: 'SWIPE_RIGHT'
	},
	WEB_API_URI: "http://192.168.0.108/DopaChat.WebAPI/api/",
	ScreenNames: { Splash: "SplashScreen", Login: "LoginScreen", CreateAccount: "CreateAccountScreen", Home: "HomeScreen", Search: "SearchScreen", Chats: "ChatsScreen", Account: "AccountScreen" },
	FONTS: {
		arial: "arial",
		HelveticaNeueBold: Platform.OS === "android" ? "HelveticaNeueBold" : "HelveticaNeue-Bold",
		HelveticaNeueMedium: Platform.OS === "android" ? "HelveticaNeueMedium" : "HelveticaNeue-Medium",
		HelveticaNeueLight: Platform.OS === "android" ? "HelveticaNeueLight" : "HelveticaNeue-Light",
		HelveticaNeueThin: Platform.OS === "android" ? "HelveticaNeueThin" : "HelveticaNeue-Thin",
		HelveticaNeue: "HelveticaNeue"
	}
};

export default Settings;
