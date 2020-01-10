import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin: 20px 0 -10px;
`;

export const UserForm = styled.View`
  align-items: center;
  padding: 8px;
  margin: 15px 0 0;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 5px;
`;

export const User = styled.Text`
  color: #eee;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
`;

export const InfoView = styled.View`
  margin: 0 5px;
`;

export const Value = styled.Text`
  color: #eee;
  text-align: center;
  font-size: 14px;
  margin-top: 5px;
`;

export const LateText = styled.Text`
  color: #f64c75;
  text-align: center;
  font-size: 14px;
  margin-top: 5px;
`;

export const Late = styled.Text`
  color: #eee;
  text-align: center;
  font-size: 14px;
  margin-top: 5px;
`;

export const Date = styled.Text`
  color: #eee;
  text-align: center;
  font-size: 14px;
  margin-top: 5px;
`;
