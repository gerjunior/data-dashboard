import { Card, Typography } from "@mui/material";

type DataCardProps = {
  card?: string;
}

export const DataCard = (props: DataCardProps) => {
  return (
    <Card
      sx={ {
        border: '1px solid black',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '15vh',
        width: '20vw',
        margin: '10px',
      } }
    >
      <Typography>{ props.card }</Typography>
    </Card>
  )
}