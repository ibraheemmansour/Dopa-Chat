import { StyleSheet } from 'react-native';
import Colors from '../../config/colors.js';
import Settings from '../../config/settings.js';

const styles = StyleSheet.create({
    MiddleContainer: { backgroundColor: Colors.Gray1, borderRadius: 5, padding: 20, marginLeft: Settings.IsTablet ? Settings.WindowWidth / 6 : Settings.WindowWidth / 17, marginRight: Settings.IsTablet ? Settings.WindowWidth / 6 : Settings.WindowWidth / 17 },
    MainTitle: { marginBottom: Settings.IsTablet ? 27 : 30, fontSize: Settings.IsTablet ? 32 : 28, color: Colors.DopaGreen, marginTop: 4 },
    TextInput: { backgroundColor: Colors.White, fontFamily: Settings.FONTS.HelveticaNeueLight, borderRadius: 5, borderColor: Colors.DopaGreen, height: Settings.WindowHeight / 17, borderWidth: 1, fontSize: 14, paddingLeft: 15 },
    PasswordPretextArea: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    Password: { letterSpacing: 1.4 },
    LoginButtonContainter: { flexDirection: 'row', justifyContent: 'space-around', marginTop: Settings.WindowHeight / 20 },
    FootContainer: { flex: 1, width: Settings.WindowWidth, marginTop: Settings.WindowHeight / 20, marginBottom: Settings.WindowHeight / 20 },
    FootNote: { fontSize: 12, color: Colors.DopaGreen, textAlign: 'justify', paddingLeft: Settings.WindowWidth / 20, paddingRight: Settings.WindowWidth / 20}
});

export default styles;
