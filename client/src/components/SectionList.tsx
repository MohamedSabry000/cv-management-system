import { Alert, Avatar, Card, CardHeader, CircularProgress, Container, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Section } from '../@types/types'
import ModalComponent from './ModalComponent';
import { deleteSection, getSections, updateSection } from '../redux/cvs/cvs-slice';
import { useParams } from 'react-router-dom';
// import {CVList} from './'

function SectionList() {
  const { isLoading, isSuccess, isError, sections } = useSelector((state: any) => state.cv)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [show, setShow] = useState(false)
  const [currentSection, setCurrentSection] = useState<Section|null>(null)
  const [currentSectionValue, setCurrentSectionValue] = useState<string|null>(null)

  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getSections(id || '') as any)
  }, [id, dispatch])

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, section: Section) => {
    event.stopPropagation();
    if(anchorEl === event.currentTarget) {
      handleCloseMenu()
    } else {
      setAnchorEl(event.currentTarget);
      setCurrentSection(section)
      console.log(section);
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setCurrentSection(null)
  };

  const handleEdit = () => {
    setCurrentSectionValue(currentSection?.title || '')
    setShow(true)
  }

  const deleteElement = () => {
    currentSection && dispatch(deleteSection(currentSection._id) as any)
    handleCloseMenu()
  }

  const editElement = (value: string) => {
    currentSection && dispatch(updateSection({ ...currentSection, title: value || '' }) as any)
    handleCloseMenu()
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
                        <IconButton aria-label="settings" onClick={e => handleOpenMenu(e, section)}>
                          <MoreVertIcon />
                        </IconButton>
                      </div>
                    }
                    title={section.title}
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
              head="Update Your Section!"
              label="Title"
              value={currentSectionValue || ''}
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

export default SectionList