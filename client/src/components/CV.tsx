import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createSection, getSections } from '../redux/cvs/cvs-slice'
import { SectionList } from '.'
import ModalComponent from './ModalComponent'

function CV() {

  const [show, setShow] = useState(false)

  const { id } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSections(id ?? '') as any);
  }, []);

  const handleCreateSection = (sectionTitle: string) => {
    dispatch(createSection({ title: sectionTitle, cvId: id ?? '' }) as any)
    setShow(false)
  }

  return (
    <Container component="main" maxWidth="lg" style={{margin: "10px auto"}}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <div>
            <Button variant="contained" color="primary" onClick={() => setShow(true)}>Add Section</Button>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="flex-center">
            <SectionList />
          </div>
        </Grid>
      </Grid>
      {
        show && (
          <ModalComponent
            setShow={setShow}
            head="Add Section!"
            label="Title"
            value=""
            handleSubmit={handleCreateSection}
          />
        )
      }
    </Container>
  )
}

export default CV