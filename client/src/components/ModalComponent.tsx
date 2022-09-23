import { Button, Typography, Modal, Box } from '@mui/material'
import React, { useState } from 'react'

interface IProps {
  setShow: (flag: boolean) => void,
  head: string,
  label: string,
  value: string | undefined,
  handleSubmit: any
}

function ModalComponent({ setShow, head, label, value, handleSubmit }: IProps) {
  const [data, setData] = useState(value || '')

  const handleCancel = () => {
    setData('')
    setShow(false)
  }

  const handleSave = () => {
    handleSubmit(data)
    setData('')
    setShow(false)
  }

  return (
    <Modal
      open={true}
      onClose={() => setShow(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex-center"
    >
      <Box className="createCv">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <p>{head}</p>
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }} className="flex-between">
          <label htmlFor="title" style={{margin: '10px'}}>{ label }</label>
          <input type="text" name="title" id="title" value={data} onChange={e=>setData(e.target.value)} />
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }} className="flex-between">
          <Button variant="contained" color="primary" onClick={handleSave}>{value? "Update" : "Add"}</Button>
          <Button variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button>
        </Typography>
      </Box>
    </Modal>
  )
}

export default ModalComponent