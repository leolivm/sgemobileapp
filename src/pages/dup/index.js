import React, {useState, useEffect} from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '../../components/Background';
import {
  Container,
  List,
  UserForm,
  User,
  InfoView,
  Late,
  Value,
  LateText,
  Date,
} from './styles';
import {format, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '../../services/api';
import Share from 'react-native-share';
import {captureScreen} from 'react-native-view-shot';

export default function Dup({navigation}) {
  const code = navigation.state.params;
  const [dupli, setDup] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function handleDup() {
      const response = await api.get(`/dup/${code}`);
      setDup(response.data);
      setLoading(false);
    }
    handleDup();
  }, [code]);

  function currencyFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }

  function formatDate(date) {
    const parsed = parseISO(date);
    const formattedDate = format(parsed, "dd 'de' MMMM 'de' yyyy", {
      locale: pt,
    });
    return formattedDate;
  }

  return (
    <Background>
      <Container>
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
            data={dupli}
            keyExtractor={user => user.CODIGO}
            renderItem={({item}) => (
              <UserForm>
                <User>{item.NOME}</User>
                <InfoView>
                  <Date>{formatDate(item.DATAVENCIMENTO)}</Date>
                  <Value>R${currencyFormat(item.VALORSALDO)}</Value>
                  <Late>
                    Atraso de
                    <LateText> {item.ATRASO} </LateText>
                    dias
                  </Late>
                </InfoView>
              </UserForm>
            )}
          />
        )}
      </Container>
    </Background>
  );
}

Dup.navigationOptions = ({navigation}) => ({
  title: 'Em aberto',
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
  headerRight: () => (
    <TouchableOpacity
      onPress={() =>
        captureScreen({
          quality: 1,
        }).then(uri =>
          Share.open({
            url: uri,
          }),
        )
      }>
      <Icon name="share" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});
