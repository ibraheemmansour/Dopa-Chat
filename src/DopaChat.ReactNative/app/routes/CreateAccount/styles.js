import { StyleSheet } from 'react-native';
import Colors from '../../config/colors.js';
import Settings from '../../config/settings.js';

const styles = StyleSheet.create({
    Container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.BackgroundColor },
    GroupedLogo: { width: 350, height: 71, aspectRatio: 350 / 71 },
    UpperView: { alignItems: 'center', marginTop: Settings.WindowHeight / 20 },
    TopImage: { width: Settings.WindowWidth / 1.8, height: Settings.WindowWidth / 2.3 },
    Version: { paddingTop: 5, marginBottom: Settings.IsTablet ? 17 : 20, fontSize: Settings.IsTablet ? 12 : 16 },
    MiddleContainer: { marginTop: Settings.WindowHeight / 100, backgroundColor: Colors.Gray1, borderRadius: 5, padding: 20, marginLeft: Settings.IsTablet ? Settings.WindowWidth / 6 : Settings.WindowWidth / 17, marginRight: Settings.IsTablet ? Settings.WindowWidth / 6 : Settings.WindowWidth / 17 },
    MainTitle: { marginBottom: Settings.IsTablet ? 27 : 30, fontSize: Settings.IsTablet ? 32 : 28, color: Colors.DopaGreen, marginTop: 4 },
    UsernamePretext: { fontSize: Settings.IsTablet ? 16 : 14, marginBottom: 6 },
    PasswordPretext: { fontSize: Settings.IsTablet ? 16 : 14 },
    TextInput: { fontFamily: Settings.FONTS.HelveticaNeueLight, borderRadius: 5, borderColor: Colors.DopaGreen, height: Settings.WindowHeight / 17, borderWidth: 1, fontSize: 14, paddingLeft: 15 },
    PasswordPretextArea: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    Password: { letterSpacing: 1.4 },
    CredentialSeparator: { marginBottom: Settings.WindowHeight / 40 },
    LoginButtonContainter: { flexDirection: 'row', justifyContent: 'space-around', marginTop: Settings.WindowHeight / 20 },
    LoginButton: { justifyContent: 'center', alignItems: 'center', width: Settings.WindowWidth / 3, height: Settings.IsTablet ? 54 : 48, backgroundColor: Colors.DopaGreen, borderRadius: 5 },
    LoginButtonText: { color: Colors.White, textAlign: "center", fontSize: Settings.IsTablet ? 16 : 14 },
});

export default styles;
