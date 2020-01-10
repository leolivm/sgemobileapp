import React, {useState, useEffect} from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '../../components/Background';
import {
  Container,
  List,
  UserForm,
  User,
  Code,
  InfoView,
  City,
  Adress,
  Nickname,
  CNPJ,
  IE,
  PhoneRes,
  PhoneCom,
  Email,
  Value,
  Payday,
  Licenses,
  Bonus,
  Expires,
} from './styles';
import api from '../../services/api';
import {format, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Share from 'react-native-share';
import {captureScreen} from 'react-native-view-shot';

export default function Info({navigation}) {
  const code = navigation.state.params;
  const [infor, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function handleInfo() {
      const response = await api.get(`/info/${code}`);
      setInfo(response.data);
      setLoading(false);
    }
    handleInfo();
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
              marginTop: 300,
            }}
          />
        ) : (
          <List
            data={infor}
            keyExtractor={user => user.CODIGO}
            renderItem={({item}) => (
              <UserForm>
                <User>{item.NOME}</User>
                <InfoView>
                  <Code>Código: {item.CODIGO}</Code>
                  <Adress>Código: {item.ENDERECO}</Adress>
                  <City>Cidade: {item.CIDADE}</City>
                  <Nickname>Apelido: {item.APELIDO}</Nickname>
                  <CNPJ>CPF/CNPJ: {item.CNPJ_CPF}</CNPJ>
                  <IE>Cidade: {item.IE_RG}</IE>
                  <PhoneRes>Tel. residencial: {item.FONERES}</PhoneRes>
                  <PhoneCom>Tel. comercial: {item.FONECOM}</PhoneCom>
                  <Email>Email: {item.EMAIL}</Email>
                  <Value>R${currencyFormat(item.VALORMENSAL)}</Value>
                  <Payday>Dia do vencimento: {item.DIAVENCIMENTO}</Payday>
                  <Licenses>Possui: {item.LICENCAS} licenças</Licenses>
                  <Bonus>Licenças Bônus: {item.LICENCAS_BONUS}</Bonus>
                  <Expires>
                    Data da expiração: {formatDate(item.DATA_EXPIRACAO)}
                  </Expires>
                </InfoView>
              </UserForm>
            )}
          />
        )}
      </Container>
    </Background>
  );
}

Info.navigationOptions = ({navigation}) => ({
  title: 'Informações',
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
