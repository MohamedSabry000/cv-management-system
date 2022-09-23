import { Box, Button, Container, Grid, Modal, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createSection, getSections } from '../redux/cvs/cvs-slice'
import { SectionList } from '.'

function CV() {

  const [show, setShow] = useState(false)
  const [sectionTitle, setSectionTitle] = useState('')

  const { id } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSections(id ?? '') as any);
  }, []);

  const handleCreateSection = () => {
    dispatch(createSection({ title: sectionTitle, cvId: id ?? '' }) as any)
    setSectionTitle('')
    setShow(false)
  }

  const handleCancel = () => {
    setSectionTitle('')
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
          <Modal
            open={show}
            onClose={() => setShow(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="flex-center"
          >
            <Box className="createCv">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <p>Add Section!</p>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }} className="flex-between">
                <label htmlFor="title" style={{margin: '10px'}}>Title</label>
                <input type="text" name="title" id="title" value={sectionTitle} onChange={e=>setSectionTitle(e.target.value)} />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }} className="flex-between">
                <Button variant="contained" color="primary" onClick={handleCreateSection}>Add</Button>
                <Button variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button>
              </Typography>
            </Box>
          </Modal>
        )
      }
    </Container>
  )
}

export default CV