import { StyleSheet } from 'react-native';

import Colors from './colors.js';
import Settings from './settings.js';

const GlobalStyles = StyleSheet.create({
    Container: { flex: 1, backgroundColor: Colors.BackgroundColor, paddingTop: Settings.WindowHeight / 120 },
    PageTitle: { fontWeight: 'bold', textAlign: "center", marginBottom: Settings.IsTablet ? 20 : 23, fontSize: Settings.IsTablet ? 18 : 20 },
    TabIcon: { width: Settings.IsTablet ? 24 : 18, height: Settings.IsTablet ? 24 : 18 },
    GroupedLogo: { width: 350, height: 71, aspectRatio: 350 / 71 },
    UpperView: { alignItems: 'center', marginTop: Settings.WindowHeight / 20 },
    TopImage: { width: Settings.WindowWidth / 1.8, height: Settings.WindowWidth / 2.3 },
    TextFieldPretext: { fontSize: Settings.IsTablet ? 16 : 14, marginBottom: 6 },
    Separator: { marginBottom: Settings.WindowHeight / 40 },
    OverallWrapperStyle: { backgroundColor: "transparent" },
    BusyContainer: { backgroundColor: "rgba(0, 0, 0, 0.6)" },
    DopaButton: { justifyContent: 'center', alignItems: 'center', width: Settings.WindowWidth / 3, height: Settings.IsTablet ? 54 : 48, backgroundColor: Colors.DopaGreen, borderRadius: 5 },
    DopaButtonText: { color: Colors.White, textAlign: "center", fontSize: Settings.IsTablet ? 16 : 14 },
});

export default GlobalStyles;
