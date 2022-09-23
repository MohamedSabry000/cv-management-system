import { Box, Button, Container, Grid, Modal, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCV } from '../redux/cvs/cvs-slice'
import { CVList } from '.'

function Home() {

  const [show, setShow] = useState(false)
  const [cvName, setCvName] = useState('')

  const { user } = useSelector((state: any) => state.cv)
  const dispatch = useDispatch()

  const handleCreateCV = () => {
    dispatch(createCV({ name: cvName, email: user.email }) as any)
    setCvName('')
    setShow(false)
  }

  const handleCancel = () => {
    setCvName('')
    setShow(false)
  }

  return (
    <Container component="main" maxWidth="lg" style={{margin: "10px auto"}}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <div>
            <Button variant="contained" color="primary" onClick={() => setShow(true)}>Create CV</Button>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="flex-center">
            <CVList />
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
                <p>Create Your CV!</p>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }} className="flex-between">
                <label htmlFor="name" style={{margin: '10px'}}>Name</label>
                <input type="text" name="name" id="name" value={cvName} onChange={e=>setCvName(e.target.value)} />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }} className="flex-between">
                <Button variant="contained" color="primary" onClick={handleCreateCV}>Create</Button>
                <Button variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button>
              </Typography>
            </Box>
          </Modal>
        )
      }
    </Container>
  )
}

export default Home