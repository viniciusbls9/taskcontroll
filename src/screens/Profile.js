import React, { Component } from 'react'
import { Alert } from 'react-native'
import styled from 'styled-components/native'
import Sistema from '../Sistema'
import firebase from '../FirebaseConnection'
import TaskLimit from '../components/TaskLimit'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'rn-fetch-blob'

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = RNFetchBlob.polyfill.Blob

const Page = styled.SafeAreaView`
    flex:1;
    padding:10px;
    background-color:#f6f4fd;
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
const FlexIcon = styled.Image`
    width:15px;
    height:15px;
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
    background-color:#75d6ff;
    position:absolute;
    bottom:28px;
    left:8px;
    padding:4px;
    height:20px;
    width:20px;
    border-radius:10px;
`
const AddImage = styled.TouchableHighlight`
    background-color:#5c8efe;
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
const Message = styled.Text`
    font-size:12px;
`
const StatsContainer = styled.View`
    flex-direction:row;
    align-self:center;
    margin-top:32px;
    margin-bottom:32px;
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
    color:#aaa;
    font-weight:500;
    text-transform:uppercase;
    text-align:center;
`
const LastTaskTitle = styled.Text`
    padding-left:8px;
    margin-bottom:10px;
    font-size:16px;
`
const Tasks = styled.FlatList`
    margin-bottom:20px;
`
const MessageTask = styled.Text`
    font-size:15px;
    margin-left:8px;
    color:#aaa;
    margin-bottom:20px;
`
const FlexOptions = styled.View `
    flex-direction:row;
    margin:0 10px 10px;
`
const BodyFlexStatus = styled.TouchableOpacity`
    border:1px solid #ccc;
    padding:10px 5px 10px 5px;
    border-radius:5px;
    width:100px;
    margin-right:10px;
    align-items:center;
    justify-content:center;
`
const FlexStatus = styled.Text`
    font-size:9px;
    font-weight:bold;
    color:#aaa;
    text-transform:uppercase;
`
const FlexLogout = styled.TouchableHighlight`
    align-items:center;
    background-color:#5c8efe;
    padding:15px;
    margin:0 8px 0 10px;
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
            userUid: firebase.auth().currentUser.uid,
            lista: [],
            listLimit: [],
            toDo: [],
            doing: [],
            concluded: [],
            userName: '',
            message: '',
            messageTask: 'Nenhuma tarefa cadastrada'

        }

        //Traz o nome do usuário logado
        Sistema.addAuthListener((user) => {
            if (user) {
                let user = this.state.userUid
                firebase.database().ref('task_users').child(user).child('name').on('value', (snapshot) => {
                    let state = this.state
                    state.userName = snapshot.val()
                    this.setState(state)
                })
            }
        })

        // Traz a ultima tarefa cadastrada pelo usuário
        Sistema.addAuthListener((user) => {
            if (user) {
                let user = this.state.userUid

                firebase.database().ref('tasks')
                    .child(user)
                    .orderByChild('task_status')
                    .equalTo('A fazer')
                    .limitToLast(1)
                    .on('value', (snapshot) => {
                        let state = this.state
                        state.listLimit = []

                        snapshot.forEach((childItem) => {
                            state.listLimit.push({
                                task_desc: childItem.val().task_desc,
                                client: childItem.val().client,
                                service: childItem.val().service,
                                task_status: childItem.val().task_status,
                                task_register: childItem.val().task_register,
                                key: childItem.key
                            })
                        })
                        this.setState(state)
                    })
            }
        })

        this.back = this.back.bind(this)
        this.getImage = this.getImage.bind(this)
        this.saveImage = this.saveImage.bind(this)
        this.logout = this.logout.bind(this)
        this.addClient = this.addClient.bind(this)
        this.addService = this.addService.bind(this)

        // Toda vez que entrar na tela de perfil, esse código busca a foto do usuário
        let storage = firebase.storage().ref().child('userAvatar/' + this.state.userUid + '.jpg')

        storage.getDownloadURL().then((url) => {
            let state = this.state
            state.image = { uri: url }
            this.setState(state)
        })

        //Código para trazer quantas tarefas "A fazer"
        Sistema.addAuthListener((user) => {
            if (user) {
                let user = this.state.userUid

                firebase.database().ref('tasks')
                    .child(user)
                    .orderByChild('task_status')
                    .equalTo('A fazer')
                    .on('value', (snapshot) => {
                        let state = this.state
                        state.toDo = []

                        snapshot.forEach((childItem) => {
                            state.toDo.push({
                                task_status: childItem.val(),
                            })
                        })
                        this.setState(state)
                    })
            }
        })

        //Código para trazer quantas tarefas "Fazendo"
        Sistema.addAuthListener((user) => {
            if (user) {
                let user = this.state.userUid

                firebase.database().ref('tasks')
                    .child(user)
                    .orderByChild('task_status')
                    .equalTo('Fazendo')
                    .on('value', (snapshot) => {
                        let state = this.state
                        state.doing = []

                        snapshot.forEach((childItem) => {
                            state.doing.push({
                                task_status: childItem.val(),
                            })
                        })
                        this.setState(state)
                    })
            }
        })

        //Código para trazer quantas tarefas "Concluído"
        Sistema.addAuthListener((user) => {
            if (user) {
                let user = this.state.userUid

                firebase.database().ref('tasks')
                    .child(user)
                    .orderByChild('task_status')
                    .equalTo('Concluído')
                    .on('value', (snapshot) => {
                        let state = this.state
                        state.concluded = []

                        snapshot.forEach((childItem) => {
                            state.concluded.push({
                                task_status: childItem.val(),
                            })
                        })
                        this.setState(state)
                    })
            }
        })
    }

    getImage() {
        let options = { title: 'Selecione uma imagem' }
        ImagePicker.showImagePicker(options, (r) => {
            if (r.uri) {
                let state = this.state;
                state.image = { uri: r.uri };
                this.setState(state);
                this.saveImage()
            }
        });
    }

    saveImage() {

        let uri = this.state.image.uri.replace('file://', '')
        let uid = this.state.userUid
        let photo = firebase.storage().ref().child('userAvatar').child(uid + '.jpg')
        let mime = 'image/jpeg'

        RNFetchBlob.fs.readFile(uri, 'base64')
            .then((data) => {
                return RNFetchBlob.polyfill.Blob.build(data, { type: mime + ';BASE64' })
            })
            .then((blob) => {
                photo.put(blob, { contentType: mime })
                    .on('state_changed', (snapshot) => {
                        let pct = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                        let state = this.state
                        state.pct = pct
                        this.setState(state)
                    }, (error) => {
                        alert(error.code)
                    }, () => {
                        this.setState({ message: 'Imagem alterada com sucesso!' })
                        setInterval(() => {
                            this.setState({ message: '' })
                        }, 3000)
                    })
            })
    }

    back() {
        this.props.navigation.goBack()
    }

    addClient() {
        this.props.navigation.navigate('AddClient')
    }
    addService() {
        this.props.navigation.navigate('AddService')
    }

    logout() {
        Alert.alert(
            'Não vá embora ):',
            'Deseja realmente sair do app?',
            [
                {
                    text: 'Sim',
                    onPress: () => Sistema.logout(),
                    style: 'cancel'
                },
                {
                    text: 'Não',
                    onPress: () => { }
                },
            ],
            { cancelable: false },
        );
    }

    render() {
        return (
            <Scroll showsVerticalScrollIndicator={false}>
                <Page>
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
                        <NameUser>{this.state.userName}</NameUser>
                        <Message>{this.state.message}</Message>
                    </InfoContainer>

                    <StatsContainer>
                        <StatsBox>
                            <StatsTitle>{this.state.toDo.length}</StatsTitle>
                            <StatsSubText>A fazer</StatsSubText>
                        </StatsBox>
                        <StatsBox style={{ borderColor: "#c7c7c7", borderLeftWidth: 1, borderRightWidth: 1 }}>
                            <StatsTitle>{this.state.doing.length}</StatsTitle>
                            <StatsSubText>Fazendo</StatsSubText>
                        </StatsBox>
                        <StatsBox>
                            <StatsTitle>{this.state.concluded.length}</StatsTitle>
                            <StatsSubText>Concluídas</StatsSubText>
                        </StatsBox>
                    </StatsContainer>

                    <LastTaskTitle>Última tarefa cadastrada</LastTaskTitle>
                    {this.state.listLimit != '' &&
                    <Tasks
                        data={this.state.listLimit}
                        renderItem={({ item }) => <TaskLimit data={item} />}
                    />
                    }
                    {this.state.listLimit == '' &&
                        <MessageTask>Nenhuma tarefa a fazer</MessageTask>
                    }

                    <LastTaskTitle>Personalizar</LastTaskTitle>
                    <FlexOptions>
                        <BodyFlexStatus onPress={this.addClient}>
                            <FlexStatus>Adicionar Cliente</FlexStatus>
                        </BodyFlexStatus>
                        <BodyFlexStatus onPress={this.addService} underlayColor="transparent">
                            <FlexStatus>Adicionar Serviço</FlexStatus>
                        </BodyFlexStatus>
                    </FlexOptions>

                    <FlexLogout onPress={this.logout} underlayColor="#457bf6">
                        <FlexTextBtn>Sair</FlexTextBtn>
                    </FlexLogout>
                </Page>
            </Scroll>
        )
    }
}

Profile.navigationOptions = ({ navigation }) => {
    return {
        title:'Perfil',
        headerTitleStyle: {
            color: '#ffffff'
        },
        headerLeft: () => null
    }
}


export default Profile