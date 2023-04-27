import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: Roboto Regular;
    src: local('Roboto'),url('public/Roboto-Regular.ttf') format('truetype');
  }

  @font-face {
    font-family: Roboto Light;
    src: url('/Roboto-Light.ttf');
  }

  @font-face {
    font-family: Roboto Bold;
    src: url('/Roboto-Bold.ttf');
  }

  @font-face {
    font-family: Merriweather Bold;
    src: url('/MerriweatherBold.ttf');
  }

  @font-face {
    font-family: Merriweather Regular;
    src: url('/MerriweatherRegular.ttf');
  }

  /* @font-face {
      font-family: General Sans Regular;
      src: url('/GeneralSans-Regular.ttf');
  }

  @font-face {
      font-family: General Sans Semibold;
      src: url('/GeneralSans-Semibold.ttf');
  } */

  * {
    margin: 0;
    /* font-family: Roboto Regular !important; */
    font-family: Montserrat;
  }

  html,
  body,
  #root {
    width: 100%;
    height: 100vh;
    margin: 0;
    background-color: #ffffff;
    scroll-behavior: smooth !important;
  }
  .background_primary {
    background-color: ${theme.light_beige};
  }
  
  `;

export default GlobalStyle;