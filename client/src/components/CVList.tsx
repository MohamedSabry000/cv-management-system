import { Alert, Avatar, Card, CardHeader, CircularProgress, Container, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CV } from '../@types/types'
import { useNavigate } from 'react-router-dom';
import { deleteCV, getCvs, updateCV } from '../redux/cvs/cvs-slice';
import ModalComponent from './ModalComponent';
// import {CVList} from './'

function CVList() {
  const { isLoading, isSuccess, isError, cvs } = useSelector((state: any) => state.cv)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [show, setShow] = useState(false)
  const [currentCV, setCurrentCV] = useState<CV|null>(null)
  const [currentCVValue, setCurrentCVValue] = useState<string|null>(null)

  const {user} = useSelector((state: any) => state.cv)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCvs() as any)
  }, [user, dispatch])

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, cv: CV) => {
    event.stopPropagation();
    if(anchorEl === event.currentTarget) {
      handleCloseMenu()
    } else {
      setAnchorEl(event.currentTarget);
      setCurrentCV(cv)
      console.log(cv);
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setCurrentCV(null)
  };

  const handleEdit = () => {
    setCurrentCVValue(currentCV?.name || '')
    setShow(true)
  }

  const deleteElement = () => {
    currentCV && dispatch(deleteCV(currentCV._id) as any)
    handleCloseMenu()
  }

  const editElement = (value: string) => {
    currentCV && dispatch(updateCV({ ...currentCV, name: value || '' }) as any)
    handleCloseMenu()
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
                        <IconButton aria-label="settings" onClick={e => handleOpenMenu(e, cv)}>
                          <MoreVertIcon />
                        </IconButton>

                      </div>
                    }
                    title={cv.name}
                  />
                </Card>
              </Grid>
            ))
          }
        </Grid>
        {
          show && (
            <ModalComponent
              setShow={setShow}
              head="Update Your CV!"
              label="Name"
              value={currentCVValue || ''}
              handleSubmit={editElement}
            />
          )
        }
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
          <MenuItem onClick={() => navigate(`/cv/${currentCV?._id}`)}>
            <Typography textAlign="center">View</Typography>
          </MenuItem>
          <MenuItem onClick={handleEdit}>
            <Typography textAlign="center">Edit</Typography>
          </MenuItem>
          <MenuItem onClick={deleteElement}>
            <Typography textAlign="center">Delete</Typography>
          </MenuItem>
        </Menu>
      </Container>
    )
  )
}

export default CVList