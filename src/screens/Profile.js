import React, { Component } from 'react'
import styled from 'styled-components/native'
import Sistema from '../Sistema'
import firebase from '../FirebaseConnection'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'rn-fetch-blob'

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = RNFetchBlob.polyfill.Blob

const Page = styled.SafeAreaView`
    flex:1;
    padding:10px;
`
const Scroll = styled.ScrollView`

`
const TitleBar = styled.TouchableHighlight`
    flex-direction:row;
    justify-content:space-between;
    margin-top:14px;
    margin-bottom:30px;
`
const Icon = styled.Image`
    width:20px;
    height:20px;
`
const ProfileBody = styled.View`
    align-self:center;
`
const ProfileImageBody = styled.View`
    width:180px;
    height:180px;
    overflow:hidden;
    border-radius:100px;
`
const ProfileImage = styled.Image`
    flex:1;
    width:250px;
    height:390px;
`
const Active = styled.View`
    background-color:#123d7d;
    position:absolute;
    bottom:28px;
    left:8px;
    padding:4px;
    height:20px;
    width:20px;
    border-radius:10px;
`
const AddImage = styled.TouchableHighlight`
    background-color:#041938;
    position:absolute;
    bottom:0;
    right:0;
    width:60px;
    height:60px;
    border-radius:30px;
    align-items:center;
    justify-content:center;
`
const IconAddImage = styled.Image`
    width:20px;
    height:20px;
`
const InfoContainer = styled.View`
    align-self:center;
    align-items:center;
    margin-top:16px;
`
const NameUser = styled.Text`
    color:#525750;
    font-weight:200;
    font-size:23px;
`
const StatsContainer = styled.View`
    flex-direction:row;
    align-self:center;
    margin-top:32px;
`
const StatsBox = styled.View`
    align-items:center;
    flex:1
`
const StatsTitle = styled.Text`
    font-size:24px;
`
const StatsSubText = styled.Text`
    font-size:12px;
    color:#c7c7c7;
    font-weight:500;
    text-transform:uppercase;
    text-align:center;
`
const FlexLogout = styled.TouchableHighlight `
    align-items:center;
    background-color:#041938;
    padding:15px;
    border-radius:5px;
`
const FlexTextBtn = styled.Text`
    color:#fff;  
`
class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            image: null,
            uid: firebase.auth().currentUser.uid
        }

        this.back = this.back.bind(this)
        this.getImage = this.getImage.bind(this)


        // let uid = firebase.auth().currentUser.uid
        let storage = firebase.storage().ref().child('userAvatar/' + this.state.uid + '.jpg')

        storage.getDownloadURL().then((url) => {
            let state = this.state
            state.image = { uri: url }
            this.setState(state)
        })
    }

    getImage() {
        let options = { title: 'Selecione uma imagem' }
        ImagePicker.showImagePicker(options, (r) => {
            if (r.uri) {
                let state = this.state;
                state.image = { uri: r.uri };
                this.setState(state);
                alert('Imagem selecionada com sucesso')
            }
        });
    }

    back() {
        this.props.navigation.goBack()
    }

    logout() {
        Sistema.logout()
    }

    render() {
        return (
            <Page>
                <Scroll showsVerticalScrollIndicator={false}>
                    <TitleBar onPress={this.back} underlayColor="transparent">
                        <Icon source={require('../uploads/arrow.png')} />
                    </TitleBar>

                    <ProfileBody>
                        <ProfileImageBody>
                            <ProfileImage source={this.state.image} />
                        </ProfileImageBody>

                        <Active></Active>
                        <AddImage onPress={this.getImage}>
                            <IconAddImage source={require('../uploads/more-white.png')} />
                        </AddImage>
                    </ProfileBody>

                    <InfoContainer>
                        <NameUser>Vinicius</NameUser>
                    </InfoContainer>

                    <StatsContainer>
                        <StatsBox>
                            <StatsTitle>483</StatsTitle>
                            <StatsSubText>A fazer</StatsSubText>
                        </StatsBox>
                        <StatsBox style={{ borderColor: "#c7c7c7", borderLeftWidth: 1, borderRightWidth: 1 }}>
                            <StatsTitle>483</StatsTitle>
                            <StatsSubText>Fazendo</StatsSubText>
                        </StatsBox>
                        <StatsBox>
                            <StatsTitle>483</StatsTitle>
                            <StatsSubText>Concluídas</StatsSubText>
                        </StatsBox>
                    </StatsContainer>
                </Scroll>
                
                <FlexLogout onPress={this.logout} underlayColor="#031126">
                    <FlexTextBtn>Logout</FlexTextBtn>
                </FlexLogout>
            </Page>
        )
    }
}

Profile.navigationOptions = ({ navigation }) => {
    return {
        title: 'Mais',
        headerStyle: {
            backgroundColor: '#040E1F',
        },
        headerTitleStyle: {
            color: '#ffffff'
        },
        headerLeft: () => null
    }
}


export default Profile