import styled from 'styled-components';

export const FilterRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SearchForm = styled.form`
  min-height: 50px;
  margin-bottom: 24px;
  input {
    height: 50px;
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
    box-sizing: border-box;
    padding: 0 12px;
    outline: none;
    font-size: 14px;
  }

  Button {
    height: 50px;
    border-radius: 0 4px 4px 0;
    margin: 0;
    background-color: blue;
    color: #fff;
  }
`;

export const SearchedTag = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0px;
  width: fit-content;
  padding: 5px 10px;
  background-color: #ddd;
  border-radius: 12px;
  color: #222;
  div {
    margin: 0 5px;
  }
  svg {
    width: 12px;

    :hover {
      cursor: pointer;
    }
  }
`;

export const SortSelectField = styled.select`
  padding: 5px 10px 5px 2px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 4px;
  font-size: 16px;
  outline: none;  
  :hover {
    cursor: pointer;
  }
`;
