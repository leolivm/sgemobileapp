import styled from 'styled-components/native';
import Button from '../../components/Button';

export const Container = styled.View`
  margin: 60px 0 30px;
`;

export const DateContainer = styled.View`
  margin: 0 20px;
  border-bottom-width: 0.5px;
  border-color: #eee;
`;

export const DateButton = styled.TouchableOpacity`
  padding: 0 15px;
  height: 46px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  margin: 10px 10px;
  flex-direction: row;
  align-items: center;
`;

export const DateText = styled.Text`
  font-size: 14px;
  color: #fff;
  margin-left: 15px;
`;

export const SubmitButtonForm = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

export const SubmitButtonRelease = styled(Button)`
  margin: 5px 0;
  padding: 15px 45px;
`;

export const SubmitButton = styled(Button)`
  margin: 5px 10px;
  padding: 12px;
`;

export const SubmitButtonInfoDup = styled(Button)`
  margin: 8px 30px;
  padding: 20px;
`;

export const SubmitHardware = styled(Button)`
  margin: 8px 30px;
  padding: 20px;
  background: #476060;
`;

export const SubmitBlock = styled(Button)`
  margin: 8px 30px;
  padding: 20px;
  background: #f64c75;
`;
