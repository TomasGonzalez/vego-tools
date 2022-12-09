import styled from 'styled-components';

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.light};
  margin: 8px;
`;

export default Button;
