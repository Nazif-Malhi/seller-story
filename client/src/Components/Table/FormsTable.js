import react from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {AiFillCloseSquare} from 'react-icons/ai';

const style = {
    color:'#C82333',
    fontSize:'1.7rem'
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const FormsTable =({rows,deleteTableRows}) => {
    
    const p = () =>{
        console.log('print');
    }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Code</StyledTableCell>
            <StyledTableCell align="right">Qty</StyledTableCell>
            <StyledTableCell align="right">Net Unit Cost</StyledTableCell>
            <StyledTableCell align="right">Tax</StyledTableCell>
            <StyledTableCell align="right">SubTotal</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.code}</StyledTableCell>
              <StyledTableCell align="right">{row.qty}</StyledTableCell>
              <StyledTableCell align="right">{row.price}</StyledTableCell>
              <StyledTableCell align="right">{row.tax}</StyledTableCell>
              <StyledTableCell align="right">{row.subTotal}</StyledTableCell>
              <StyledTableCell align="right"><AiFillCloseSquare style={style} onClick={()=>(deleteTableRows(index))}/></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default FormsTable