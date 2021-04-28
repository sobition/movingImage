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



export const CustomTableCell = styled(TableCell)`
  Button {
    margin: 0 5px;
  }
  .EditBtn {
    background-color: #b6ccfe;
    color: #03045e;
  }

  .DeleteBtn {
    color: #fff;
    background-color: #ff3330;
  }
`;
