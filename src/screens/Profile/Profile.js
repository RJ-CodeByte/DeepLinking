import {
    Text,
    StyleSheet,
    View,
    FlatList,
    Image,
    Pressable,
    ScrollView,
    Linking,
    Platform,
    Modal,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ImageBackground,
} from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userId, usersData } from '../../redux/actions/Users';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import colors from '../../constants/colors';
import styles from './styles';

import navigationStrings from '../../constants/navigationStrings';
import Share from 'react-native-share';
import { USERS_LIST } from '../../config/urls';
import CameraRoll from '@react-native-community/cameraroll';
import { launchImageLibrary } from 'react-native-image-picker';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { ModalFadeTransition } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import { SafeAreaView } from 'react-native-safe-area-context';

const win = Dimensions.get('window');
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: this.props.route.params.uid,
            getLink: '',
            images: [],
            selectedImages: [],
            // selectedImage: '',
            bgColor: false,
            isVisible: false,
            selected: false,
        };
    }

    componentDidMount() {
        this.props.userId(this.state.uid);
        if (Platform.OS === 'ios') {
            const iosGetlink = `deeplinking://${this.state.uid}`;
            this.setState({ getLink: iosGetlink });
        } else {
            const link = USERS_LIST + `/${this.state.uid}`;
            this.setState({ getLink: link });
        }
    }

    shareUser = async () => {
        const res = await Share.open({
            message: 'Dummy message',
            url: this.state.getLink,
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                err && console.log(err);
            });
    };

    setData = () => {
        console.log('first', res);
    };

    setImage = () => {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
        })
            .then(r => {
                // console.log('r', r.edges)

                var mainArray = [];
                let imageArray = []
                // r.edges.push({ selected: false });                
                // r.edges.map((obj, index) => {
                //     // console.log('obj', obj)
                //     imageArray = [{ ...obj.node.image, selected: false }]
                //     // imageArray.push({ selected: false })
                //     // array = [...obj.node.image, { selected: true }]                    
                //     console.log('array', imageArray)
                //     mainArray = [{ ...r.edges, }]
                //     // mainArray.push(imageArray)
                //     // obj.node.image.push({ selected: true })
                // })
                // console.log('r.edges', r.edges);
                r.edges.map((obj, index) => {
                    obj.node.image.isSelected = false
                    mainArray.push(obj)
                })
                // this.setState({ photos: r.edges });
                this.setState({ images: r.edges, isVisible: true });
            })
            .catch(err => {
                //Error Loading Images
            });


        // launchImageLibrary('saveToPhotos', response => {
        //     console.log('response', response)
        //     const res = response.hasOwnProperty('assets') && response.assets.map(function (item) {
        //         return item.uri;
        //     })
        //     this.setState({ selectedImage: res[0]?.toString() })
        // })
    };
    openGallary() {
        launchImageLibrary('saveToPhotos', response => {
            console.log('response', response)
            const res = response.hasOwnProperty('assets') && response.assets.map(function (item) {
                return item.uri;
            })
            this.setState({ selectedImage: res[0]?.toString(), isVisible: false })
        }).then(() => this.setState({ isVisible: false }))
    }
    handlePermission() {
        if (Platform.OS === 'ios') {
            request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log(
                            'This feature is not available (on this device / in this context)',
                        );
                        break;
                    case RESULTS.DENIED:
                        console.log(
                            'The permission has not been requested / is denied but requestable',
                        );
                        break;
                    case RESULTS.LIMITED:
                        console.log('The permission is limited: some actions are possible');
                        break;
                    case RESULTS.GRANTED:
                        this.setImage();
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;
                }
            });
        } else {
            request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(result => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log(
                            'This feature is not available (on this device / in this context)',
                        );
                        break;
                    case RESULTS.DENIED:
                        console.log(
                            'The permission has not been requested / is denied but requestable',
                        );
                        break;
                    case RESULTS.LIMITED:
                        console.log('The permission is limited: some actions are possible');
                        break;
                    case RESULTS.GRANTED:
                        this.setImage();
                        // console.log('imageUri', imageUri[0])
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;
                }
            });
        }
    }

    selectedItems(item) {
        // console.log('item', item, this.state.images)
        const dummyArray = this.state.images;
        dummyArray.map((obj, index) => {
            if (obj.node.image.uri === item.node.image.uri) {
                obj.node.image.isSelected = !obj.node.image.isSelected;
            }
        })
        this.setState({ images: dummyArray, selected: true })
    }

    displaySelctedItems() {
        this.setState({ selectedImages: this.state.images, isVisible: false })
    }


    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Modal
                    visible={this.state.isVisible}
                    transparent
                    style={{ flex: 1 }}
                    onRequestClose={() => this.setState({ isVisible: !this.state.isVisible })}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        }}
                        onPress={() => this.setState({ isVisible: false })}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                flex: 1,
                                backgroundColor: '#FFFF',
                                borderTopLeftRadius: 30,
                                borderTopRightRadius: 30,
                                maxHeight: '50%',
                                paddingHorizontal: 20,
                                paddingVertical: 20,
                            }}>
                            <View
                                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => this.setState({
                                    isVisible: false,
                                    // selected: false,
                                })}>
                                    <Text style={{ color: '#5352ed' }}>Cancle</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this.openGallary();
                                }
                                }>
                                    <Text style={{ color: '#5352ed' }}>All Photos</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, marginTop: '2%' }}>
                                <FlatList
                                    contentContainerStyle={{ flexGrow: 1 }}

                                    data={this.state.images}
                                    numColumns={3}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity
                                            delayPressIn={0}
                                            activeOpacity={0.8}
                                            onPress={() => {
                                                this.selectedItems(item)
                                            }
                                            } style={{ width: '33%' }}>
                                            <ImageBackground
                                                key={index}
                                                style={{
                                                    // flex: 1,
                                                    width: (win.width - 48 - 6) / 3,
                                                    // alignSelf: 'stretch',
                                                    height: (win.width - 48 - 6) / 3,
                                                    // aspectRatio: 0.5
                                                    // margin: '0.5%',
                                                    marginBottom: 4
                                                }}
                                                resizeMode="cover"
                                                source={{ uri: item.node.image.uri }}>
                                                <TouchableOpacity
                                                    style={[
                                                        {
                                                            position: 'absolute',
                                                            borderRadius: 30,
                                                            borderColor: 'white',
                                                            height: 20,
                                                            width: 20,
                                                            borderWidth: 2,
                                                            right: 0,
                                                            marginHorizontal: 10,
                                                            top: 10,
                                                        },
                                                        item.node.image.isSelected && {
                                                            backgroundColor: '#FFFF',
                                                        },
                                                    ]}

                                                    onPress={() => {
                                                        // this.setState({ selectedIndex: index, selected: true, selectedItem: item.node.image.uri, })
                                                    }}
                                                />
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                            {/* <View style={{ flexWrap: 'wrap', marginVertical: '2%', }}>
                                    {this.state.images.map((p, i) => {
                                        return (
                                            <Image
                                                key={i}
                                                style={{
                                                    width: 120,
                                                    height: 110,
                                                    margin: '0.5%'
                                                }}
                                                source={{ uri: p.node.image.uri }}
                                            />
                                        );
                                    })}
                                </View> */}

                            <TouchableOpacity
                                style={{
                                    width: '100%',
                                    backgroundColor: '#4154EA',
                                    borderRadius: 30,
                                    height: 50,
                                    marginVertical: '2%',
                                    justifyContent: 'center',
                                }}
                                onPress={() => this.displaySelctedItems()}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        color: 'white',
                                        fontSize: 20,
                                        fontWeight: '600',
                                    }}>
                                    DONE
                                </Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>
                <TouchableOpacity
                    onPress={() => this.handlePermission()}>
                    <Image
                        source={{
                            uri: !!this.state.selectedImage
                                ? this.state.selectedImage
                                : !!this.props.userprofile.avatar
                                    ? this.props.userprofile.avatar
                                    : 'https://thumbs.dreamstime.com/b/user-profile-icon-creative-trendy-colorful-round-button-illustration-isolated-156511788.jpg',
                        }}
                        style={{
                            width: moderateScale(200),
                            height: moderateScale(200),
                        }}
                    />



                    {/* <Image source={{ uri: this.state.selectedImage }}
                        style={{
                            width: moderateScale(200),
                            height: moderateScale(200),
                        }}
                    /> */}
                </TouchableOpacity>
                <View style={{ flexWrap: 'wrap', marginVertical: '2%', flexDirection: 'row', }}>
                    {console.log(this.state.selectedImages)}
                    {this.state.selectedImages.map((p, i) => {
                        if (p.node.image.isSelected === true) {
                            return (
                                <Image
                                    key={i}
                                    style={{
                                        width: 120,
                                        height: 110,
                                        margin: '0.5%'
                                    }}
                                    source={{ uri: p.node.image.uri }}
                                />
                            );
                        }
                        // return (
                        //     <Image
                        //         key={i}
                        //         style={{
                        //             width: 120,
                        //             height: 110,
                        //             margin: '0.5%'
                        //         }}
                        //         source={{ uri: p.node.image.uri }}
                        //     />
                        // );
                    })}
                </View>
                <Text
                    style={{
                        fontSize: moderateScale(30),
                        fontWeight: 'bold',
                        color: colors.black,
                        marginTop: moderateVerticalScale(8),
                    }}>
                    {this.props.userprofile.first_name}
                    {'  '}
                    {this.props.userprofile.last_name}
                </Text>
                <Text
                    style={{
                        fontSize: moderateScale(15),
                        color: colors.blackOpacity80,
                    }}>
                    {this.props.userprofile.email}
                </Text>

                <Pressable
                    onPress={this.shareUser}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? 'rgb(210, 100, 200)'
                                : 'rgb(120,120,200)',
                            padding: moderateScale(10),
                            marginTop: moderateVerticalScale(10),
                        },
                    ]}>
                    <Text style={{ color: '#FFFF' }}>Share This User</Text>
                </Pressable>
            </View >
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.userReducer.users,
        userprofile: state.userReducer.userprofile,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        userId: id => dispatch(userId(id)),
        userdata: () => dispatch(usersData()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
