import styled from "styled-components";
import theme from "../styles/theme";

const DashboardWrapper = styled.div`
  height: 100vh;
  margin: 0px;

  color: ${theme.white};
  width: 100%;
  background: ${theme.backgroundColor};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .expensesRightContainer {
    display: flex;
    flex-direction: column;
  }

  .page-body-div1 {
    // background-color: black;
    // margin: 2.5rem;
    height: 90%;
    width: 20%;
    display: flex;
    justify-content: space-between;
    // border-radius: 30px;
    padding-left: 3.125rem;
    flex-direction: column;
    border-right: 2px solid ${theme.backgroundAccentColor};
  }
  .page-body-div2 {
    margin-left: 1rem !important;
    padding: 30px;
    // margin: 3rem;
    height: 90%;
    width: 77%;
    display: flex;
    /* justify-content: center;
  align-items: center; */
    // border-radius: 30px;
    margin-right: 1.15rem;

    .rightSectionHeading {
      margin-bottom: 20px;
    }
  }
  .div1-sub1-h1 {
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    color: ${theme.dark_beige};
    font-family: "Montserrat", sans-serif;
    // margin-top: 3.75rem !important;
    margin: 0px;
  }
  .div1-sub1 {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 50%;
  }
  .div1-sub1-ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    color: #ffffff;
    margin-top: 3.75rem;
    font-family: "Montserrat", sans-serif;
  }

  .dashboardRightContainer {
    padding: 30px;
    h2 {
      color: ${theme.light_beige};
      font-size: ${theme.heading4} !important;
    }
  }

  .div1-sub1-li-username {
    cursor: default;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: #ffffff;
    margin-bottom: 2.5rem;
    padding: 10px;
  }

  .div1-sub1-li {
    cursor: pointer;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: #ffffff;
    margin-bottom: 2.5rem;
    margin-right: 16px;
    padding: 10px 0px 10px 20px;
    border-radius: 12px;
  }
  .def {
    font-weight: 700;
  }
  .div1-sub1-li:hover {
    font-weight: 700;
    background-color: ${theme.backgroundAccentColor};
  }
  .div1-sub2 {
    font-family: "Montserrat", sans-serif;
    color: #ffffff;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 3rem;
  }
  .icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 1.25rem;
    font-weight: 700;
    /* margin-top: 2rem; */
  }
  .dash-user {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
    margin-top: -1rem;
    margin-bottom: -1rem;
    height: 10%;
  }
  .fav {
    width: 2rem !important;
    height: 2rem !important;
  }

  .home {
    .homeContainer {
      .widgets,
      .charts {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 20px;
        gap: 20px;
      }
    }
  }

  #menu {
    width: 35px;
    height: 30px;
    margin: 30px 0 20px 20px;
    cursor: pointer;
    display: none;
    z-index: 100;
    .bar {
      display: block;
      height: 5px;
      width: 100%;
      background-color: black;
      border-radius: 5px;
      transition: 0.3 ease;
    }
    #bar1 {
      transform: translateY(-4px);
    }
    #bar3 {
      transform: translateY(4px);
    }
  }
  @media (max-width: 1456px) {
    #menu {
      display: none;
    }
  }

  @media (max-width: 998px) {
    .widgets {
    }

    #menu {
      display: block;
      top: 0;
    }
    .nav {
      display: none;
    }

    .change {
      width: 100%;
      position: absolute;
      transition: 1s ease;
      display: inline;
    }
  }
`;

export default DashboardWrapper;
