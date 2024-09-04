import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Styles from './NavbarStyle';

interface User {
  email: string;
  profImg: string;
  nickname: string;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/MainHome';
  };

  const handleCreateStoryClick = () => {
    if (user) {
      navigate('/CreateStory');
    } else {
      alert('로그인 후 이용해주세요!');
      setTimeout(() => {
        navigate('/Login');
      }, 400);
    }
  };

  return (
    <Styles.Navbar>
      <Styles.MainMenu>
        <Styles.MenuItem>
          <Link to="/MainHome">
            <Styles.LogoImage src="src/assets/images/logo.png" alt="Logo" />
          </Link>
        </Styles.MenuItem>
        <Styles.MenuItem>
          나의 동화
          <Styles.SubMenu>
            <Styles.SubMenuItem to="/CreateStory" onClick={handleCreateStoryClick}>
              동화 제작
            </Styles.SubMenuItem>
            <Styles.SubMenuItem to="/Store">
              씨앗 상점
            </Styles.SubMenuItem>
          </Styles.SubMenu>
        </Styles.MenuItem>
        <Styles.MenuItem>
          동화 책장
          <Styles.SubMenu>
            <Styles.SubMenuItem to="/PopularBook">
              인기 동화
            </Styles.SubMenuItem>
            <Styles.SubMenuItem to="/Search">
              동화 검색
            </Styles.SubMenuItem>
          </Styles.SubMenu>
        </Styles.MenuItem>
        <Styles.MenuItem>
          <Styles.StyledLink to="/Service">고객센터</Styles.StyledLink>
        </Styles.MenuItem>
        <Styles.MenuItem>
          <Styles.StyledMypageLink to="/Mypage">마이페이지</Styles.StyledMypageLink>
        </Styles.MenuItem>
      </Styles.MainMenu>

      <div className="login-signup">
        {user ? (
          <div>
            <Styles.ProfileContainer>
            <Link to="/Mypage">
              <Styles.Idname>{user.nickname} 님</Styles.Idname>
              </Link>
              <Styles.ProfileImage
                src={user.profImg || 'src/assets/images/default-profile.png'}
                alt="profile"
              />
              <button onClick={handleLogout}>Logout</button>
            </Styles.ProfileContainer>
          </div>
        ) : (
          <>
            <Link to="/Login">
              <Styles.LoginSignupButton>Login</Styles.LoginSignupButton>
            </Link>
            <Link to="/SignUp">
              <Styles.LoginSignupButton>회원가입</Styles.LoginSignupButton>
            </Link>
          </>
        )}
      </div>
    </Styles.Navbar>
  );
};

export default Navbar;
