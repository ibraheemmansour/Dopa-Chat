import { StyleSheet, Platform } from 'react-native';

import Colors from './colors.js';
import Settings from './settings.js';

const GlobalStyles = StyleSheet.create({
    IOS_MarginTop: { marginTop: Settings.WindowWidth / 15 },
    ScreenWrapper: { flex: 1, backgroundColor: Colors.White },
    MainContainer: { paddingTop: Platform.OS == "ios" ? Settings.WindowWidth / 12 : Settings.WindowWidth / 20, paddingLeft: Settings.WindowWidth / 20, paddingRight: Settings.WindowWidth / 20 },
    DetailsMainContainer: { marginTop: Platform.OS == "ios" ? Settings.WindowWidth / 12 : 0, marginLeft: Settings.WindowWidth / 20, marginRight: Settings.WindowWidth / 20, marginBottom: Settings.WindowWidth / 20 },
    TabIcon: { width: Settings.IsTablet ? 24 : 18, height: Settings.IsTablet ? 24 : 18 },
    ForwardArrow: { width: 10, height: 10 },
    ShadowBox: {
        justifyContent: 'space-between', borderRadius: 5,
        ...Platform.select({
            ios: { borderWidth: 1, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowColor: Colors.Gray_Shadow, borderColor: Colors.Gray_Shadow },
            android: { borderWidth: 1, borderColor: Colors.Gray_BorderTextInput },
        })
    },
    NSG_InfoIcon: { width: Settings.IsTablet ? 29 : 20, height: Settings.IsTablet ? 29 : 20 },
    SortIcon: { width: 36, height: 35 },
    FilterIcon: { width: 36, height: 35, marginLeft: 10 },
    BandwidthArrow: { width: 8, height: 12 },
    PastWeekIcon: { width: 12, height: 12, marginRight: 5 },
    OverallWrapperStyle: { backgroundColor: "transparent" },
    Modal: { borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: Colors.White, flex: 1, marginTop: Platform.OS == "android" ? Settings.WindowHeight / 2 : 0 },
    ModalContainer: { backgroundColor: Platform.OS == "android" ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)" },
    BusyContainer: { backgroundColor: "rgba(0, 0, 0, 0.6)" },
    GrayHandleContainer: { borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: Colors.Gray_TabsBackground, paddingTop: 15, paddingBottom: 15, justifyContent: 'center', alignItems: 'center' },
    GrayHandle: { width: 40, height: 6, backgroundColor: Colors.Gray_SortHandle },
    TitleText: { fontSize: Settings.IsTablet ? 30 : 28, color: Colors.Purple_Text },
});

export default GlobalStyles;
