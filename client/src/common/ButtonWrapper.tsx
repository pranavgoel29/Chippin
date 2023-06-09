import styled from "styled-components";
import theme from "../styles/theme";

const ButtonWrapper = styled.div`
  .form-button {
    cursor: pointer;
    background: ${theme.button_dark_beige};
    border-radius: 10px;
    border: none;
    height: 2.3rem;
    width: 100%;
    /* margin-bottom: 1rem; */
    // margin-top: 1rem;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: ${theme.button_font};
  }

  .form-button:hover {
    background: ${theme.button_dark_beige_hover};
  }
`;

export default ButtonWrapper;
