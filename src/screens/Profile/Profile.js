import { Text, StyleSheet, View, FlatList, Image, Pressable, Linking } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userId, usersData } from '../../redux/actions/Users'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import colors from '../../constants/colors'
import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import navigationStrings from '../../constants/navigationStrings'
import Share from 'react-native-share';
import { USERS_LIST } from '../../config/urls'


class Profile extends Component {

    state = {
        uid: this.props.route.params.uid
    }

    componentDidMount() {
        this.props.userId(this.state.uid)
    }


    shareUser = async () => {
        const getLink = USERS_LIST + `/${this.state.uid}`
        console.log('getLink', getLink)
        const res = await Share.open({
            message: 'Dummy message',
            url: getLink
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                err && console.log(err);
            });

    }


    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Image source={{ uri: !!this.props.userprofile.avatar ? this.props.userprofile.avatar : "https://thumbs.dreamstime.com/b/user-profile-icon-creative-trendy-colorful-round-button-illustration-isolated-156511788.jpg" }}
                    style={{
                        width: moderateScale(200),
                        height: moderateScale(200),
                    }}
                />
                <Text style={{
                    fontSize: moderateScale(30),
                    fontWeight: 'bold',
                    color: colors.black,
                    marginTop: moderateVerticalScale(8),
                }}>{this.props.userprofile.first_name}{'  '}{this.props.userprofile.last_name}</Text>
                <Text style={{
                    fontSize: moderateScale(15),
                    color: colors.blackOpacity80
                }}>{this.props.userprofile.email}</Text>

                <Pressable onPress={this.shareUser} style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                            ? 'rgb(210, 100, 200)'
                            : 'rgb(120,120,200)',
                        padding: moderateScale(10),
                        marginTop: moderateVerticalScale(10)
                    },
                ]}>
                    <Text style={{ color: '#FFFF' }}>Share This User</Text>
                </Pressable>
            </View>
        )
    }
}


const mapStateToProps = state => {
    return {
        users: state.userReducer.users,
        userprofile: state.userReducer.userprofile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userId: (id) => dispatch(userId(id)),
        userdata: () => dispatch(usersData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);