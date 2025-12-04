import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { styled } from 'styled-components';
import { LuMoon, LuSun } from 'react-icons/lu';

function ThemeSwitcher() {
  const { themeName, toggleTheme } = useContext(ThemeContext);

  return (
    <ThemeSwitcherStyle onClick={toggleTheme}>
      {themeName === 'light' ? <LuMoon /> : <LuSun />}
    </ThemeSwitcherStyle>
  );
}

const ThemeSwitcherStyle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;

  svg {
    width: 30px;
    height: 30px;
    fill: ${({ theme }) => theme.color.text};
  }
`;

export default ThemeSwitcher;
