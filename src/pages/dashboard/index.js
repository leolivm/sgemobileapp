import React, {Component} from 'react';
import {
  Keyboard,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Background from '../../components/Background';
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  List,
  UserForm,
  User,
  City,
  Nickname,
  Data,
  DataContainer,
  DataText,
  LoadingForm,
} from './styles';
import api from '../../services/api';
import {format, parseISO, isBefore} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Dashboard extends Component {
  state = {newUser: '', users: [], loading: false};

  handleSearch = async () => {
    const {newUser} = this.state;
    if (newUser === '') {
      return;
    }
    this.setState({loading: true});
    await api.get(`/search/${newUser}`).then(res => {
      this.setState({users: res.data, newUser: '', loading: false});
    });
    Keyboard.dismiss();
  };

  formatDate = date => {
    const data = parseISO(date);
    const dateFormatted = format(data, "dd 'de' MMMM 'de' yyyy", {locale: pt});
    return dateFormatted;
  };

  handleNavigate = item => {
    const {navigation} = this.props;
    navigation.navigate('Update', {item});
  };

  handleLogOut = () => {
    const {navigation} = this.props;
    navigation.navigate('Logout');
  };

  render() {
    const {users, newUser, loading} = this.state;
    return (
      <Background>
        <Container>
          <Form>
            <FormInput
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite o cliente"
              icon="person-outline"
              returnKeyType="send"
              value={newUser}
              onChangeText={text => this.setState({newUser: text})}
              onSubmitEditing={this.handleSearch}
            />
            <SubmitButton onPress={this.handleLogOut}>
              <Icon name="input" size={15} color="#FFF" />
            </SubmitButton>
            <SubmitButton onPress={this.handleSearch}>
              <Icon name="search" size={15} color="#FFF" />
            </SubmitButton>
          </Form>

          <LoadingForm>
            {loading ? (
              <ActivityIndicator
                size="large"
                color="#3b9eef"
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 250,
                }}
              />
            ) : (
              <List
                data={users}
                keyExtractor={user => user.CODIGO}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => this.handleNavigate(item)}>
                    <UserForm>
                      <User>{item.NOME}</User>
                      <Nickname>{item.APELIDO}</Nickname>
                      <City>{item.CIDADE}</City>
                      <DataContainer>
                        <DataText>Data da expiração:</DataText>
                        <Data
                          style={
                            isBefore(parseISO(item.DATA_EXPIRACAO), new Date())
                              ? styles.pastdate
                              : styles.nonpast
                          }>
                          {this.formatDate(item.DATA_EXPIRACAO)}
                        </Data>
                      </DataContainer>
                    </UserForm>
                  </TouchableOpacity>
                )}
              />
            )}
          </LoadingForm>
        </Container>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  pastdate: {
    color: 'red',
    fontWeight: 'bold',
  },
  nonpast: {
    color: '#D8F0FF',
  },
});
