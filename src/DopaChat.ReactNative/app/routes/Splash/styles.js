import { StyleSheet } from 'react-native';
import Colors from '../../config/colors';
import Settings from '../../config/settings';

const styles = StyleSheet.create({
    MainContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.BackgroundColor },
    GroupedLogo: { width: 350, height: 71, aspectRatio: 350 / 71 },
    LogoContainer: { height: Settings.WindowHeight / 2, justifyContent: 'flex-end' },
    MessageContainer: { height: Settings.WindowHeight / 2, paddingBottom: Settings.WindowHeight / 10, justifyContent: 'flex-end' },
    Message: { fontSize: 14, color: Colors.DopaGreen, textAlign: 'center', width: Settings.WindowWidth / 1.2 }
});

export default styles;