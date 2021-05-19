import { StyleSheet } from 'react-native';

import Colors from './colors.js';
import Settings from './settings.js';

const GlobalStyles = StyleSheet.create({
    Container: { flex: 1, backgroundColor: Colors.BackgroundColor, paddingTop: Settings.WindowHeight / 120 },
    UpperView: { alignItems: 'center', marginTop: Settings.WindowHeight / 20 },
    PageTitle: { fontWeight: 'bold', textAlign: "center", marginBottom: Settings.IsTablet ? 20 : 23, fontSize: Settings.IsTablet ? 18 : 20 },
    TabIcon: { width: Settings.IsTablet ? 24 : 18, height: Settings.IsTablet ? 24 : 18 },
    GroupedLogo: { width: 350, height: 71, aspectRatio: 350 / 71 },
    TopImage: { width: Settings.WindowWidth / 1.8, height: Settings.WindowWidth / 2.3 },
    Subtitle: { textTransform: 'uppercase', fontSize: Settings.IsTablet ? 16 : 14, marginBottom: 6 },
    TextInput: { backgroundColor: Colors.White, fontFamily: Settings.FONTS.HelveticaNeueLight, borderRadius: 5, borderColor: Colors.DopaGreen, height: Settings.WindowHeight / 17, borderWidth: 1, fontSize: 14, paddingLeft: 15 },
    Separator: { marginBottom: Settings.WindowHeight / 40 },
    PickerContainer: { borderWidth: 1, borderRadius: 5, padding: 1, borderColor: Colors.DopaGreen },
    Picker: { backgroundColor: Colors.White },
    Info: { marginBottom: 15, textAlign: 'justify', fontSize: Settings.IsTablet ? 14 : 12, marginRight: 15 },
    OverallWrapperStyle: { backgroundColor: "transparent" },
    BusyContainer: { backgroundColor: "rgba(0, 0, 0, 0.6)" },
    DopaButton: { justifyContent: 'center', alignItems: 'center', width: Settings.WindowWidth / 3, height: Settings.IsTablet ? 54 : 48, backgroundColor: Colors.DopaGreen, borderRadius: 5 },
    DopaButtonText: { color: Colors.White, textAlign: "center", fontSize: Settings.IsTablet ? 16 : 14 },
});

export default GlobalStyles;
