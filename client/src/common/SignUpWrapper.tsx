import styled from "styled-components";
import theme from "../styles/theme";

const SignUpWrapper = styled.div`
  .main-div {
    background-color: ${theme.backgroundColor};
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .sub-div1 {
    background-color: ${theme.backgroundColor};
    height: 100vh;
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sub-div2 {
    background-color: #f5f5f5;
    height: 100vh;
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .head-div {
    position: fixed;
    height: 6rem;
    width: 100%;
    background-color: ${theme.primaryColor};
    color: ${theme.dark_beige};
    display: none;
    justify-content: center;
    align-items: center;
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 48px;
  }
  .title-heading {
    font-size: 72px;
    font-weight: 700;
    color: ${theme.dark_beige};
    font-family: "Montserrat", sans-serif;
  }
  .form-div {
    border-radius: 10px;
    width: 22rem;
    // height: 25rem;
    height: fit-content;
    font-family: "Montserrat", sans-serif;
    margin-top: -2rem;
  }
  .signup-head {
    margin: 0px;
    font-size: 36px;
    font-weight: 700;
    line-height: 44px;
  }
  .sub-signup-head {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
  }
  .signin-option {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
  .sign-auth {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 10.4rem;
    height: 2rem;
    background-color: #ffffff;
    color: #858585;
    border: none;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
  }
  .form-main-div {
    display: flex;
    flex-direction: column;
    margin-top: 1.4rem;
    padding: 1.8rem;
    width: 18.5rem;
    border-radius: 20px;
    background-color: #ffffff;
  }
  .form-label {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 19px;
    margin-top: 1.5rem;
    color: #000000;
  }
  .form-input {
    background: #f5f5f5;
    border-radius: 10px;
    border: none;
    height: 2rem;
    padding-left: 0.8rem;
    width: 96%;
    margin-bottom: 1rem;
    margin-top: 4px;
    margin-right: 1rem;
  }
  .form-input:focus {
    background: #eaeaea;
  }
  .form-button {
    background: black;
    border-radius: 10px;
    border: none;
    height: 2.3rem;
    width: 100%;
    /* margin-bottom: 1rem; */
    margin-top: 1rem;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #ffffff;
  }
  .forgot-password {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 19px;
    color: #346bd5;
    text-decoration: none;
    height: 20px;
  }
  .signup-link-text {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 19px;
    color: #858585;
    text-decoration: none;
    height: 20px;
    text-align: center;
    margin-top: 1.4rem;
  }
  .signup-link-text2 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 19px;
    color: #346bd4;
    text-decoration: none;
    height: 20px;
    text-align: center;
    margin-top: 1.4rem;
    text-decoration: none;
  }

  .createNewLink:hover {
    text-decoration: underline;
  }

  @media (max-width: 750px) {
    .sub-div1 {
      display: none;
    }
    .sub-div2 {
      width: 100%;
    }
    .head-div {
      display: flex;
    }
  }
`;

export default SignUpWrapper;
