import { Alert, Avatar, Card, CardHeader, CircularProgress, Container, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CV } from '../@types/types'
import { useNavigate } from 'react-router-dom';
// import {CVList} from './'

function CVList() {
  const { isLoading, isSuccess, isError, cvs } = useSelector((state: any) => state.cv)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate()
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
            cvs.map((cv: CV) => (
              <Grid item xs={12} md={6} lg={4} key={cv._id}>
                <Card sx={{ maxWidth: 345 }} >
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {cv.name[0].toUpperCase()}
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
                          <MenuItem onClick={() => navigate(`/cv/${cv._id}`)}>
                            <Typography textAlign="center">View</Typography>
                          </MenuItem>
                          <MenuItem onClick={() => handleEdit(cv._id)}>
                            <Typography textAlign="center">Edit</Typography>
                          </MenuItem>
                          <MenuItem onClick={() => deleteElement(cv._id)}>
                            <Typography textAlign="center">Delete</Typography>
                          </MenuItem>
                        </Menu>
                      </div>
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