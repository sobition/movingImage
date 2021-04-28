import styled from 'styled-components';

export const EditInputGroup = styled.div`
  margin: 16px 0;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  label {
    margin-top: 10px;
  }
  div {
    width: 85%;
    padding: 0 10px;
    input,
    select {
      overflow-y: auto;
      margin-bottom: 4px;
      font-size: 1.2rem;
      outline: none;
      padding: 10px 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
      option:checked {
        width: 100%;
      }
    }

    input {
      width: calc(100% - 40px);
    }
    select {
      width: 100%;
    }
    small {
      color: red;
    }
  }

  #videoAuthor {
    background: #fff;
  }

  #videoCategories {
    height: 100px;
  }
`;

export const ButtonContainer = styled.div`
  justify-content: flex-end;
  display: flex;

  Button {
    margin: 0 5px;
  }

  #CancelBtn {
    color: #222;
    border: 1px solid #222;
    border-radius: #222;
  }
`;
