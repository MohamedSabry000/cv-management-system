import { Alert, Avatar, Card, CardHeader, CircularProgress, Container, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Section } from '../@types/types'
// import {CVList} from './'

function SectionList() {
  const { isLoading, isSuccess, isError, sections } = useSelector((state: any) => state.cv)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const dispatch = useDispatch()

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    anchorEl === event.currentTarget ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = (id: string) => {

  }

  const deleteElement = (id: string) => {

  }

  return (
    isLoading ? <CircularProgress color="secondary" />
    : isError ? <Alert severity="error">Something went Error, Make sure from internet Connection !</Alert>
    : isSuccess && (
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
                      <div>
                        <IconButton aria-label="settings" onClick={handleOpenMenu}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                          open={Boolean(anchorEl)}
                          onClose={handleCloseMenu}
                          sx={{
                            display: { xs: 'block' },
                          }}
                        >
                          <MenuItem onClick={() => handleEdit(section._id)}>
                            <Typography textAlign="center">Edit</Typography>
                          </MenuItem>
                          <MenuItem onClick={() => deleteElement(section._id)}>
                            <Typography textAlign="center">Delete</Typography>
                          </MenuItem>
                        </Menu>
                      </div>
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
  )
}

export default SectionList