import { StyleSheet } from 'react-native';
import Colors from '../../config/colors.js';
import Settings from '../../config/settings.js';

const styles = StyleSheet.create({
    Container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.BackgroundColor },
    GroupedLogo: { width: 350, height: 71, aspectRatio: 350 / 71 },
    UpperView: { alignItems: 'center', marginTop: Settings.WindowHeight / 20 },
    TopImage: { width: Settings.WindowWidth / 1.8, height: Settings.WindowWidth / 2.3 },
    Version: { paddingTop: 5, marginBottom: Settings.IsTablet ? 17 : 20, fontSize: Settings.IsTablet ? 12 : 16 },
    MiddleContainer: { marginLeft: Settings.IsTablet ? Settings.WindowWidth / 6 : Settings.WindowWidth / 17, marginRight: Settings.IsTablet ? Settings.WindowWidth / 6 : Settings.WindowWidth / 17 },
    UsernamePretext: { fontSize: Settings.IsTablet ? 16 : 14, marginBottom: 6 },
    Separator: { marginBottom: Settings.WindowHeight / 40 },
    Title: { textAlign: "center", marginBottom: Settings.IsTablet ? 17 : 20, fontSize: Settings.IsTablet ? 16 : 18 },
    LoginButtonContainter: { flexDirection: 'row', justifyContent: 'space-around', marginTop: Settings.WindowHeight / 20 },
    LoginButton: { justifyContent: 'center', alignItems: 'center', width: Settings.WindowWidth / 3.8, height: Settings.IsTablet ? 54 : 48, backgroundColor: Colors.DopaGreen, borderRadius: 5 },
    LoginButtonText: { color: Colors.White, textAlign: "center", fontSize: Settings.IsTablet ? 20 : 18 },
    PersonTouchable: {marginBottom: 10, marginLeft: 5, marginRight: 5},
    PersonContainer: {backgroundColor: Colors.Gray4, borderRadius: 80, width: Settings.WindowWidth / 3.6, height: Settings.WindowWidth / 3.6, alignItems: 'center', justifyContent: 'center'},
    PersonTitle: {padding: 10, textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: Colors.White },
});

export default styles;