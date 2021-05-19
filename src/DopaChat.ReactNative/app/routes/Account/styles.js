import { StyleSheet } from 'react-native';
import Colors from '../../config/colors.js';
import Settings from '../../config/settings.js';

const styles = StyleSheet.create({
    Container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.BackgroundColor },
    UpperView: { alignItems: 'center', marginTop: Settings.WindowHeight / 20 },
    GroupedLogo: { width: 350, height: 71, aspectRatio: 350 / 71 },
    Version: { paddingTop: 5, marginBottom: Settings.IsTablet ? 17 : 20, fontSize: Settings.IsTablet ? 12 : 16 },
    TopImage: { width: Settings.WindowWidth / 1.8, height: Settings.WindowWidth / 2.3 },
    MiddleContainer: { marginBottom: Settings.WindowHeight / 30, marginLeft: Settings.IsTablet ? Settings.WindowWidth / 6 : Settings.WindowWidth / 17, marginRight: Settings.IsTablet ? Settings.WindowWidth / 6 : Settings.WindowWidth / 17 },
    MainTitle: { marginBottom: Settings.IsTablet ? 27 : 30, fontSize: Settings.IsTablet ? 32 : 28, color: Colors.DopaGreen, marginTop: 4 },
    AvatarContainer: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: Settings.WindowHeight / 50 },
    AvatarTextContainer: { borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginRight: 10, backgroundColor: Colors.Gray4, width: Settings.WindowWidth / 3, height: Settings.WindowWidth / 3 },
    NameContainer: { flexDirection: 'row', alignItems: 'flex-start' },
    Pencil: { width: 20, height: 20, marginLeft: 10 },
    Separator: { marginBottom: Settings.WindowHeight / 50 },
    FlatListItemContainer: { flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' },
    TextAreaContainer: { borderColor: Colors.Gray2 },
    TextArea: { padding: 15, height: Settings.WindowHeight / 5 },
    Password: { letterSpacing: 1.6 },
    Label: { fontSize: Settings.IsTablet ? 20 : 18, fontWeight: 'bold' },
    ShowLocation: { flexDirection: 'row', alignItems: 'center' },
    LocationContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    LoginButtonContainter: { flexDirection: 'row', justifyContent: 'center', alignContent: 'center' },
    LoginButton: { justifyContent: 'center', alignItems: 'center', width: Settings.WindowWidth / 3, height: Settings.IsTablet ? 54 : 48, backgroundColor: Colors.DopaGreen, borderRadius: 5 },
    LoginButtonText: { color: Colors.White, fontSize: Settings.IsTablet ? 16 : 14 }
});

export default styles;