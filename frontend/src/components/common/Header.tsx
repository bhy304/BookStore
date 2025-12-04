import { styled } from 'styled-components';
import { PiBooks } from 'react-icons/pi';
import { FaSignInAlt, FaRegUser, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCategory } from '@/hooks/useCategory';
import { useAuth } from '@/hooks/useAuth';
import Dropdown from './Dropdown';
import ThemeSwitcher from '../header/ThemeSwitcher';

function Header() {
  const category = useCategory();
  const { isLoggedIn, storeLogout } = useAuth();

  return (
    <HeaderStyle>
      <h1 className='logo'>
        <Link to='/'>
          <PiBooks />
          <p>
            <span>BOOK</span>STORE
          </p>
        </Link>
      </h1>
      <nav className='category'>
        <ul>
          {category.map((item) => (
            <li key={item.category_id}>
              <Link
                to={
                  item.category_id === null ? '/books' : `/books?category_id=${item.category_id}`
                }>
                {item.category_name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className='auth'>
        <Dropdown toggleButton={<FaUserCircle />}>
          {isLoggedIn ? (
            <ul>
              <li>
                <Link to='/cart'>장바구니</Link>
              </li>
              <li>
                <Link to='/order'>주문 내역</Link>
              </li>
              <li>
                <button onClick={storeLogout}>로그아웃</button>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to='/login'>
                  <FaSignInAlt />
                  로그인
                </Link>
              </li>
              <li>
                <Link to='/signup'>
                  <FaRegUser />
                  회원가입
                </Link>
              </li>
            </ul>
          )}
        </Dropdown>
        <ThemeSwitcher />
      </nav>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.background};

  .logo {
    a {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;

      p {
        font-size: 1.5rem;
        span {
          color: ${({ theme }) => theme.color.primary};
        }
      }
    }
    /* img {
      width: 200px;
    } */
  }

  .category {
    ul {
      display: flex;
      gap: 32px;

      li {
        a {
          font-size: 1.5rem;
          font-weight: 600;
          text-decoration: none;
          color: ${({ theme }) => theme.color.text};

          &:hover {
            color: ${({ theme }) => theme.color.primary};
          }
        }
      }
    }
  }

  .auth {
    display: flex;

    ul {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      width: 100px;
      margin: 0;

      li {
        a,
        button {
          width: 100%;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          justify-content: center;
          align-items: center;
          line-height: 1;
          background: none;
          border: 0;
          cursor: pointer;

          svg {
            margin-right: 6px;
          }
        }

        button {
          padding: 0;
        }

        &::before {
          content: none;
        }
      }
    }
  }
`;

export default Header;
