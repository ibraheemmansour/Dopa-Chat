import { StyleSheet } from 'react-native';
import Colors from '../../config/colors.js';
import Settings from '../../config/settings.js';

const styles = StyleSheet.create({
    PersonContainer: { paddingTop: 15, paddingLeft: 10, backgroundColor: Colors.White, borderRadius: 10, marginBottom: Settings.WindowHeight / 10 },
    SubTitleText: { marginTop: 20, marginBottom: 5, textAlign: 'justify', fontWeight: 'bold' },
    DescriptionContainer: { marginRight: 10, marginBottom: 20, padding: 10, paddingBottom: 50, backgroundColor: Colors.Gray0 },
    LowerContainter: { flex: 1, alignItems: 'center' },
    ChatButton: { justifyContent: 'center', alignItems: 'center', width: Settings.WindowWidth / 3, height: Settings.IsTablet ? 54 : 48, backgroundColor: Colors.DopaGreen, borderRadius: 5 },
    ChatButtonText: { color: Colors.White, fontSize: Settings.IsTablet ? 20 : 18 },
});

export default styles;