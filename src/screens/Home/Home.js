import { Text, StyleSheet, View, FlatList, Image } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { usersData } from '../../redux/actions/Users'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import colors from '../../constants/colors'
import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import navigationStrings from '../../constants/navigationStrings'

class Home extends Component {


    componentDidMount() {
        this.props.userdata()
    }

    renderItem = ({ item }) => (
        <TouchableOpacity style={styles.flatStyle} onPress={() => this.props.navigation.navigate(navigationStrings.Profile, { uid: item.id })} >
            <View style={styles.flexView}>
                <View>
                    <Text style={{
                        fontSize: moderateScale(12),
                        fontWeight: 'bold',
                        color: colors.black,
                        marginTop: moderateVerticalScale(8),
                    }} >{item?.first_name}{'  '}{item?.last_name}</Text>
                    <Text style={{
                        fontSize: moderateScale(12),
                        color: colors.blackOpacity80
                    }}>{item.email}</Text>
                </View>
                <Image source={{ uri: !!item.avatar ? item.avatar : "https://thumbs.dreamstime.com/b/user-profile-icon-creative-trendy-colorful-round-button-illustration-isolated-156511788.jpg" }}
                    style={{
                        width: moderateScale(64),
                        height: moderateScale(64),
                    }}
                />
            </View>
        </TouchableOpacity>
    )

    render() {
        return (
            <View>
                <FlatList
                    data={this.props.users}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }





}



const mapStateToProps = state => {
    return {
        users: state.userReducer.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userdata: () => dispatch(usersData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);