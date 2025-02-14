import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useCurrentWeather } from '../hook/useCurrentWeather';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faLocationDot, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { addRecentListItem, clearRecentList, clickSearchBtn, initSearchCity, removeRecentListItem, setSearchCity } from "../store/reducer/WeatherReducer";
import "../style/Header.css";

function Header() {

  const dispatch = useDispatch();
  const { currentLocation, searchCity, recentList, searchBtnClick } = useSelector(state => state.weather);
  const { data, error } = useCurrentWeather(currentLocation.lat, currentLocation.lon, searchCity);
  const { pathname } = useLocation();

  const [value, setValue] = useState('');
  const [pendingValue, setPendingValue] = useState('');

  useEffect(() => {
    let timeout;

    const errorMessage = error?.toString() || '';

    if (errorMessage.includes("data is undefined")) {
      alert('존재하지 않는 지역입니다.');
      dispatch(initSearchCity());
      setPendingValue('');
    } else {
      timeout = setTimeout(() => {
        if (pendingValue) {
          dispatch(addRecentListItem(pendingValue));
          setPendingValue('');
        }
      }, 1000)
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    }
  }, [error, pendingValue])

  const onSubmit = (e) => {
    e.preventDefault();

    if (value.trim()) {
      if (/^[a-zA-Z\s]*$/.test(value)) {
        dispatch(setSearchCity(value));
        setPendingValue(value);
      } else {
        alert('영어로 입력해주세요.');
      }
    } else {
      alert('검색어를 입력해주세요!');
    }
    setValue('');
    dispatch(clickSearchBtn(false));
  }

  const initKeywrod = () => {
    dispatch(initSearchCity());
    dispatch(clickSearchBtn(false));
  }

  const clickKeyword = (keyword) => {
    dispatch(setSearchCity(keyword));
    dispatch(addRecentListItem(keyword));
    dispatch(clickSearchBtn(false));
  }

  return (
    <header>
      {
        pathname === '/' ?
          <div className={`${searchBtnClick ? "header_inner on" : "header_inner"}`}>
            <div className="header_wrap">
              <div className="current_location">
                <FontAwesomeIcon icon={faLocationDot} onClick={initKeywrod}/>
                <p>{data?.name}</p>
              </div>
              <div className="search" onClick={() => dispatch(clickSearchBtn(!searchBtnClick))}>
                {
                  searchBtnClick ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faMagnifyingGlass} />
                }
              </div>
            </div>
              <div className="search_wrap">
                <form className="input_form" onSubmit={onSubmit}>
                  <input 
                    type="text" 
                    placeholder="지역/도시명을 영문으로 입력해주세요."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </form>
                <div className="keyword_box">
                  {
                    recentList.length > 0 ?
                      <div className="recent_list">
                        <ul>
                          { recentList.map(item => (
                            <li key={item.id}>
                              <p onClick={() => clickKeyword(item.keyword)}>{item.keyword}</p>
                              <FontAwesomeIcon icon={faXmark} onClick={() => dispatch(removeRecentListItem(item.keyword))} />
                            </li>
                          ))}
                        </ul>
                        <button type="button" onClick={() => dispatch(clearRecentList())}>전체삭제</button>
                      </div> :
                      <p>최근 검색어가 존재하지 않습니다.</p>
                  }
                </div>
              </div>
          </div> :
          <div className="header_inner">
            <p>Today's News</p>
          </div>
      }
    </header>
  )
}

export default Header;