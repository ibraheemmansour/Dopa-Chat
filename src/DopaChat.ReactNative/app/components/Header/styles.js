import { StyleSheet } from 'react-native';
import Settings from '../../config/settings.js';

const styles = StyleSheet.create({
    GroupedLogo: { width: 350, height: 71, aspectRatio: 350 / 71 },
    UpperView: { alignItems: 'center', marginTop: Settings.WindowHeight / 20 },
    Version: { paddingTop: 5, marginBottom: Settings.IsTablet ? 17 : 20, fontSize: Settings.IsTablet ? 12 : 16 },
});


export default styles;