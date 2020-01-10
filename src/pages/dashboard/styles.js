import styled from 'styled-components/native';
import Input from '../../components/Input';
import Button from '../../components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 10px;
  border-bottom-width: 0.5px;
  border-color: #eee;
  margin-bottom: -5px;
`;

export const FormInput = styled(Input)`
  flex: 1;
  height: 40px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  padding: 0 15px;
`;

export const SubmitButton = styled(Button)`
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  margin-left: 10px;
  height: 40px;
  padding: 0 12px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const UserForm = styled.View`
  align-items: center;
  margin: 5px 5px 12px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  padding: 12px;
`;

export const User = styled.Text`
  color: #eee;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
`;

export const City = styled.Text`
  color: #eee;
  text-align: center;
  font-size: 12px;
  margin-top: 5px;
`;

export const Nickname = styled.Text`
  color: #eee;
  font-style: italic;
  text-align: center;
  font-size: 12px;
  margin-top: 5px;
`;

export const DataContainer = styled.View`
  flex-direction: row;
`;

export const DataText = styled.Text`
  margin-right: 5px;
  margin-top: 5px;
  color: #eee;
`;

export const Data = styled.Text`
  color: #eee;
  text-align: center;
  font-size: 13px;
  margin-top: 5px;
`;

export const LoadingForm = styled.View``;
