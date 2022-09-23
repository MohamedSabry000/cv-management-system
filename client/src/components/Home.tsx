import { Button, Container, Grid } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCV } from '../redux/cvs/cvs-slice'
import { CVList } from '.'
import ModalComponent from './ModalComponent'

function Home() {

  const [show, setShow] = useState(false)

  const { user } = useSelector((state: any) => state.cv)
  const dispatch = useDispatch()

  const handleCreateCV = (cvName: string) => {
    dispatch(createCV({ name: cvName, email: user.email }) as any)
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
          <ModalComponent
            setShow={setShow}
            head="Create Your CV!"
            label="Name"
            value=""
            handleSubmit={handleCreateCV}
          />
        )
      }
    </Container>
  )
}

export default Home