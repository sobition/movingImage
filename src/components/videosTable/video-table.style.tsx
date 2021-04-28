import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
export const CustomisedTable = styled(Table)`
  tbody tr:nth-child(odd) {
    background-color: #d8d8d8;
  }
  border-collapse: collapse;
  border: 1px solid #adb5bd;
  td,
  th {
    border: 1px solid #adb5bd;
  }
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

export const CustomTableCell = styled(TableCell)`
  Button {
    margin: 0 5px;
  }
  #EditBtn {
    background-color: #b6ccfe;
    color: #03045e;
  }

  #DeleteBtn {
    color: #fff;
    background-color: #ff3330;
  }
`;
