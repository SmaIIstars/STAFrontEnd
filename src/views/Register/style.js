import styled from "styled-components";

export const RegisterFrame = styled.div`
  position: relative;
  width: 700px;
  height: 600px;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 50px 0;
  color: white;

  border-radius: 10px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.4);

  > a {
    color: rgba(255, 255, 255, 0.7);
  }
  > a:hover {
    color: rgba(255, 255, 255, 1);
  }

  .registerTitle {
    text-align: center;
    font-size: 24px;
  }

  .exchange-icon {
    position: absolute;
    cursor: pointer;

    font-size: 20px;
    padding: 10px;
    right: 15px;
    top: 10px;
  }

  .form {
    height: 100%;
    display: flex;
    align-items: center;
    flex-flow: column;
    justify-content: space-evenly;

    .form-label {
      width: 50%;
      label {
        color: white;
      }
      label > div > i {
        padding: 0 5px;
      }
      label:hover {
        cursor: pointer;
      }
    }

    > div input,
    input:hover,
    input:focus {
      width: 100%;
      height: 30px;

      box-shadow: none;
      background-color: transparent;
      border: none;
      border-bottom: 1px solid white;
      color: white;
      outline: none;
      ::-webkit-input-placeholder {
        color: white;
      }

      :-webkit-autofill,
      :-webkit-autofill:hover,
      :-webkit-autofill:focus,
      :-webkit-autofill:active {
        transition-delay: 99999s;
        transition: color 99999s ease-out, background-color 99999s ease-out;
      }
    }
  }

  .enterBut {
    width: 200px;
    height: 50px;
    border-radius: 50px;
    align-self: center;
    background-color: transparent;
    border: none;

    background-image: linear-gradient(
      to right,
      rgba(255, 0, 0, 0),
      rgba(255, 255, 255, 0.3),
      rgba(255, 0, 0, 0)
    );

    line-height: 47px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
  }

  .enterBut:hover {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.1) inset;
  }
`;
