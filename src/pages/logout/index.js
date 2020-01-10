import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, SubmitButton, LogText} from './styles';
import {useDispatch} from 'react-redux';
import Background from '../../components/Background';
import {signOut} from '../../store/modules/auth/actions';

export default function Logout() {
  const dispatch = useDispatch();

  function handleLogOut() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Container>
        <LogText>Deseja sair do AppSge?</LogText>
        <SubmitButton onPress={handleLogOut}>Sair do AppSge</SubmitButton>
      </Container>
    </Background>
  );
}

Logout.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});
