import { StyleSheet } from 'react-native';
import Colors from '../../config/colors.js';
import Settings from '../../config/settings.js';

const styles = StyleSheet.create({
    MiddleContainer: { marginLeft: Settings.IsTablet ? Settings.WindowWidth / 6 : Settings.WindowWidth / 17, marginRight: Settings.IsTablet ? Settings.WindowWidth / 6 : Settings.WindowWidth / 17 },
    Separator: { marginBottom: Settings.WindowHeight / 40 },
    LoginButtonContainter: { flexDirection: 'row', justifyContent: 'space-around', marginTop: Settings.WindowHeight / 20 },
    LoginButton: { justifyContent: 'center', alignItems: 'center', width: Settings.WindowWidth / 3.8, height: Settings.IsTablet ? 54 : 48, backgroundColor: Colors.DopaGreen, borderRadius: 5 },
    LoginButtonText: { color: Colors.White, textAlign: "center", fontSize: Settings.IsTablet ? 20 : 18 },
    PersonTouchable: {marginBottom: 10, marginLeft: 5, marginRight: 5},
    PersonContainer: {backgroundColor: Colors.Gray4, borderRadius: 80, width: Settings.WindowWidth / 3.6, height: Settings.WindowWidth / 3.6, alignItems: 'center', justifyContent: 'center'},
    PersonTitle: {padding: 10, textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: Colors.White },
});

export default styles;