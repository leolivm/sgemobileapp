import React, {useMemo, useState} from 'react';
import {DatePickerAndroid, ToastAndroid, TouchableOpacity} from 'react-native';
import Background from '../../components/Background';
import {
  Container,
  DateContainer,
  DateButton,
  DateText,
  SubmitButtonForm,
  SubmitButton,
  SubmitButtonRelease,
  SubmitHardware,
  SubmitBlock,
  SubmitButtonInfoDup,
} from './styles';
import {parseISO, format, addDays} from 'date-fns';
import api from '../../services/api';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Update({navigation}) {
  const code = navigation.getParam('item').CODIGO;
  const [newDate, setNewDate] = useState(
    parseISO(navigation.getParam('item').DATA_EXPIRACAO),
  );

  const dateFormatted = useMemo(
    () => format(newDate, "dd 'de' MMMM 'de' yyyy", {locale: pt}),
    [newDate],
  );

  async function handleOpenPicker() {
    const {action, year, month, day} = await DatePickerAndroid.open({
      mode: 'default',
      date: newDate,
    });

    if (action === DatePickerAndroid.dateSetAction) {
      const selectedDate = new Date(year, month, day);
      const date = selectedDate.toISOString();
      await api.get(`/updatedate/${code}/${date}`);
      const formatted = parseISO(date.toString());
      setNewDate(formatted);

      ToastAndroid.showWithGravityAndOffset(
        'Data atualizada!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        120,
      );
    }
  }

  async function handleRelease() {
    const selectedDate = addDays(new Date(), 1);
    const date = selectedDate.toISOString();
    await api.get(`/updatedate/${code}/${date}`);
    const formatted = parseISO(date.toString());
    setNewDate(formatted);

    ToastAndroid.showWithGravityAndOffset(
      'Cliente liberado um dia',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      120,
    );
  }

  async function addDay() {
    const selectedDate = addDays(newDate, 1);
    const date = selectedDate.toISOString();
    await api.get(`/updatedate/${code}/${date}`);
    const formatted = parseISO(date.toString());
    setNewDate(formatted);

    ToastAndroid.showWithGravityAndOffset(
      'Adicionado um dia',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      120,
    );
  }

  async function subDay() {
    const selectedDate = addDays(newDate, -1);
    const date = selectedDate.toISOString();
    await api.get(`/updatedate/${code}/${date}`);
    const formatted = parseISO(date.toString());
    setNewDate(formatted);

    ToastAndroid.showWithGravityAndOffset(
      'Subtraído um dia',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      120,
    );
  }

  async function handleBlock() {
    const data = new Date('1900-01-02T00:00:00.000Z');
    const date = data.toISOString();
    await api.get(`/updatedate/${code}/${date}`);
    const formatted = parseISO(date.toString());
    setNewDate(formatted);

    ToastAndroid.showWithGravityAndOffset(
      'Cliente bloqueado',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      120,
    );
  }

  async function handleHardware() {
    await api.get(`/hardware/${code}`);
    ToastAndroid.showWithGravityAndOffset(
      'Hardware atualizado',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      120,
    );
  }

  function handleInfo(item) {
    navigation.navigate('Info', item);
  }

  function handleDup(item) {
    navigation.navigate('Dup', item);
  }

  return (
    <Background>
      <Container>
        <DateContainer>
          <DateButton onPress={handleOpenPicker}>
            <Icon name="event" color="#FFF" size={20} />
            <DateText onChangeText={setNewDate}>{dateFormatted}</DateText>
          </DateButton>
        </DateContainer>

        <SubmitButtonForm>
          <SubmitButton onPress={subDay}>
            <Icon name="remove" size={20} color="#FFF" />
          </SubmitButton>
          <SubmitButtonRelease onPress={handleRelease}>
            Liberar um dia
          </SubmitButtonRelease>
          <SubmitButton onPress={addDay}>
            <Icon name="add" size={20} color="#FFF" />
          </SubmitButton>
        </SubmitButtonForm>

        <SubmitHardware onPress={handleHardware}>
          Atualizar Hardware
        </SubmitHardware>
        <SubmitButtonInfoDup onPress={() => handleInfo(code)}>
          Informações
        </SubmitButtonInfoDup>
        <SubmitButtonInfoDup onPress={() => handleDup(code)}>
          Em aberto
        </SubmitButtonInfoDup>
        <SubmitBlock onPress={handleBlock}>Bloquear</SubmitBlock>
      </Container>
    </Background>
  );
}

Update.navigationOptions = ({navigation}) => ({
  title: navigation.getParam('item').NOME,
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});
