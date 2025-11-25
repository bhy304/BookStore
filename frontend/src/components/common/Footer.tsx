import { PiBooks } from 'react-icons/pi';
import styled from 'styled-components';

function Footer() {
  return (
    <FooterStyle>
      <h1 className="logo">
        <PiBooks />
        <p>
          <span>BOOK</span>STORE
        </p>
      </h1>
      <div className="copyright">
        <p>copyright(c), {new Date().getFullYear()}, Book Store.</p>
      </div>
    </FooterStyle>
  );
}

const FooterStyle = styled.footer`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-top: 1px solid ${({ theme }) => theme.color.background};

  .logo {
    display: flex;
    align-items: center;
    gap: 8px;

    p {
      font-size: 0.75rem;
    }
  }

  .copyright {
    p {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.color.text};
    }
  }
`;

export default Footer;
