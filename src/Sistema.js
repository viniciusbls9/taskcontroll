import firebase from './FirebaseConnection'

class Sistema {
    //FUNÇÃO PARA DESLOGAR O USUÁRIO E APARECER NA TELA DE LOGIN
    logout() {
        firebase.auth().signOut()
    }
    // FUNÇÃO PARA CHAMAR O "OUVINTE" DE NOVOS DADOS DO FIREBASE. SE ATUALIZAR QUALQUER DADO NO BANCO, ELE BUSCA E MOSTRA NA TELA
    addAuthListener(callback) {
        firebase.auth().onAuthStateChanged(callback)
    }
    // FUNÇÃO PARA VERIFICAR DADOS DE ACESSO DO USUÁRIO
    login(email, senha) {
        return firebase.auth().signInWithEmailAndPassword(email, senha)
    }
    // FUNÇÃO PARA REGISTRAR NOVO USUÁRIO NO APLICATIVO
    registerConfirme(email, senha) {
        firebase.auth().createUserWithEmailAndPassword(email, senha).catch((error) => {
            alert(error.code)
        })
    }
    // FUNÇÃO QUE PEGA INFORMAÇÕES DO USUÁRIO
    getUserInfo(callback) {
        firebase.database().ref('task_users')
        .child(firebase.auth().currentUser.uid)
        .once('value')
        .then(callback)
    }
}


export default new Sistema()