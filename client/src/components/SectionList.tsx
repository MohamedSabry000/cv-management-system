import { Avatar, Card, CardHeader, Container, Grid, IconButton } from '@mui/material'
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import React from 'react'
import { useSelector } from 'react-redux'
import { Section } from '../@types/types'
// import {CVList} from './'

function SectionList() {
  const { sections } = useSelector((state: any) => state.cv)

  return (
    <Container component="main" maxWidth="lg" style={{margin: "10px auto"}}>
      <Grid container spacing={2}>
        {
          sections.map((section: Section) => (
            <Grid item xs={12} md={6} lg={4} key={section._id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {section.title[0].toUpperCase()}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={section.title}
                />
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </Container>
  )
}

export default SectionList