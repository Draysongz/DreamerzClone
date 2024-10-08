import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

export default function Tables({referrals}: {referrals: any}) {
  return (
    <Box>
      <TableContainer> 
        <Table variant="simple" size="sm" >
          <TableCaption></TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Winnings</Th>
              <Th isNumeric>Total Wins</Th>
            </Tr>
          </Thead>
          <Tbody>
         {referrals && referrals.map((referral: any, index: any)=>{
          return(
               <Tr key={index}>
              <Td>{referral.username}</Td>
              <Td>{referral.balance}</Td>
              <Td isNumeric>{referral.totalWins}</Td>
            </Tr>
          )
         })}
           
          </Tbody>
          <Tfoot>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th isNumeric></Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
}
