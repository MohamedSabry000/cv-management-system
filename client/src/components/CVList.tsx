import { Alert, Avatar, Card, CardHeader, CircularProgress, Container, Grid, IconButton } from '@mui/material'
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import React from 'react'
import { useSelector } from 'react-redux'
import { CV } from '../@types/types'
import { useNavigate } from 'react-router-dom';
// import {CVList} from './'

function CVList() {
  const { isLoading, isSuccess, isError, cvs } = useSelector((state: any) => state.cv)

  const navigate = useNavigate()

  return (
    isLoading ? <CircularProgress color="secondary" />
    : isError ? <Alert severity="error">Something went Error, Make sure from internet Connection !</Alert>
    : isSuccess && (
      <Container component="main" maxWidth="lg" style={{margin: "10px auto"}}>
        <Grid container spacing={2}>
          {
            cvs.map((cv: CV) => (
              <Grid item xs={12} md={6} lg={4} key={cv._id}>
                <Card sx={{ maxWidth: 345 }} onClick={() => navigate(`/cv/${cv._id}`)}>
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
  )
}

export default CVList