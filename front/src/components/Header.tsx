
import { ClassAttributes, FC, LiHTMLAttributes } from 'react';
import style from '../styles/header.module.css';
import { BrowserRouter as Router, Route } from "react-router-dom";



const Header: FC = (props) => {

  return (
    <header>
      <div className={style.header}>
        <ul>         
            <li  className={"/" ? style.current : undefined}>
              메인 페이지
            </li>
            <li className={"/MyPage" ? style.current : undefined}>
              내 페이지
            </li>
            <li className={ "/TestView" ? style.current : undefined}>
              테스트 뷰
            </li>
            <li className={ "/Creator" ? style.current : undefined}>
              만들기 +
            </li>
        </ul>
      </div>
    </header>
  )
};


export default Header;
