
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
export function DeleteAlert({fileName}:{fileName:string}){
  return(
  <Stack sx={{width:"100%"}} spacing={2}>
<Alert variant="filled" severity="success">
        {fileName} has been deleted
      </Alert>
    </Stack>
  )
}
