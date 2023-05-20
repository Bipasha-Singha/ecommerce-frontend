import styled, { ThemeProvider } from "styled-components";
import insta from "../image/insta.jpg";
import fblogo from "../image/fblogo.jpg";
import nike from "../image/nike.png";
import airtel from "../image/airtel.png";
import topcem from "../image/topcem.png";
const theme = {
  colors: {
    bg: "#F5D5A9", // define your background color here
    text: "#000000" // define your text color here
  },
  media: {
    mobile: "480px" // define your mobile breakpoint here
  }
};

const Trusted = () => {
  return (
    <ThemeProvider theme={theme}>
    <Wrapper className="brand-section">
      <div className="container">
        <h3>Trusted By 1000+ Companies</h3>
        <div className="brand-section-slider">
          { /* my 1st img  */}
          <div className="slide">
            <img
              src={insta}
              alt="trusted-brands"
            />
          </div>
          <div className="slide">
            <img
              src={fblogo}
              alt="trusted-brands"
            />
          </div>
          <div className="slide">
            <img
              src={nike}
              alt="trusted-brands"
            />
          </div>
          <div className="slide">
            <img
              src={topcem}
              alt="trusted-brands"
            />
          </div>
          <div className="slide">
            <img
              src={airtel}
              alt="trusted-brands"
            />
          </div>
        </div>
      </div>
    </Wrapper>
    </ThemeProvider>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0;
  background-color: ${({ theme }) => theme.colors.bg};
  .brand-section {
    padding: 12rem 0 0 0;
  }
  h3 {
    text-align: center;
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.text};
    font-size: 2rem;
    font-weight: bold;
  }
  img {
    min-width: 5rem;
    height: 5rem;
  }
  .brand-section-slider {
    margin-top: 3.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .brand-section-slider {
      margin-top: 3.2rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      /* background-color: red; */
      text-align: center;
    }
  }
`;

export default Trusted;