import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';

export const NewVideoLink = styled(Link)`
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 4px;
  background-color: #6bbf59 !important;
  color: #fff !important;
`;

export const CustomToolbar = styled(Toolbar)`
  justify-content: space-between;
`;
