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
    OnTopShadow: { width: Settings.WindowWidth / 1.5, top: Settings.WindowHeight / 14, left: Settings.WindowWidth / 10, position: 'absolute', zIndex: 1},
    OnTop: { width: Settings.WindowWidth / 1.5, top: Settings.WindowHeight / 7, left: Settings.WindowWidth / 10, position: 'absolute', zIndex: 1},
    Description: { margin: 10, padding: 10, paddingBottom: 50, backgroundColor: Colors.Gray0 },
    ChatButtonContainter: { flexDirection: 'row', justifyContent: 'space-around', marginTop: Settings.WindowHeight / 50 },
    ChatButton: { justifyContent: 'center', alignItems: 'center', width: Settings.WindowWidth / 3, height: Settings.IsTablet ? 54 : 48, backgroundColor: Colors.DopaGreen, borderRadius: 5 },
    ChatButtonText: { color: Colors.White, fontSize: Settings.IsTablet ? 20 : 18 },
    RemoteControlContainer: { marginBottom: Settings.WindowHeight / 59.2, marginTop: 7 },
	RemoteControlRow: { flexDirection: "row", justifyContent: 'space-around', alignItems: 'center' },
    SwiperInnerBody: { backgroundColor: Colors.White, borderBottomLeftRadius: 10, borderRadius: 10, marginLeft: 5, marginRight: 5, width: Settings.WindowWidth / 1.5, height: Settings.WindowHeight / 2 },
});

export default styles;