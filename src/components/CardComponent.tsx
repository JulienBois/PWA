import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Article } from '../interfaces/Article';

export default function CardComponent({ id, title }: Article) {
  return (
    <div className='flex-col rounded-2xl m-5'>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {id}
          </Typography>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}