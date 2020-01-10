import styled from 'styled-components/native';
import Button from '../../components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

export const LogText = styled.Text`
  color: #eee;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`;

export const SubmitButton = styled(Button)`
  justify-content: center;
  align-items: center;
  background: #f64c75;
  border-radius: 4px;
  height: 50px;
  padding: 0 50px;
  margin-top: 12px;
`;
