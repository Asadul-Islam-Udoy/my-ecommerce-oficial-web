import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
function Lodder() {
  return (
    <>
     <div style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:'80vh',
        position:'absolute',
        width:'100%'
     }}>
      <Stack sx={{ color: 'grey.700' }} spacing={10} direction="row">
      <CircularProgress color="secondary" />
    </Stack>
     </div>
    </>
  )
}

export default Lodder
