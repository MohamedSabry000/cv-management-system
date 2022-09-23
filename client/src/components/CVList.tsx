import { Avatar, Card, CardHeader, Container, Grid, IconButton } from '@mui/material'
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import React from 'react'
import { useSelector } from 'react-redux'
import { CV } from '../@types/types'
// import {CVList} from './'

function CVList() {
  const { cvs } = useSelector((state: any) => state.cv)

  return (
    <Container component="main" maxWidth="lg" style={{margin: "10px auto"}}>
      <Grid container spacing={2}>
        {
          cvs.map((cv: CV) => (
            <Grid item xs={12} md={6} lg={4} key={cv._id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {cv.name[0].toUpperCase()}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={cv.name}
                />
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </Container>
  )
}

export default CVList