import { StyleSheet, Text, View } from 'react-native';
import {
    moderateScale,
    moderateVerticalScale,
    scale,
} from 'react-native-size-matters';
import colors from '../../constants/colors';
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatStyle: {
        backgroundColor: colors.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        padding: moderateScale(20),
        borderRadius: moderateScale(20),
        margin: moderateScale(5),
    },
    flexView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default styles;
