import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { useHistory } from 'react-router-dom'
import patientService from '../services/patientService'
import { makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar, InputAdornment } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import Search from '@material-ui/icons/Search'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import PatientsForm from '../components/Patiens/PatientsForm'
import MenuBar from '../components/MenuBar'
import PageHeader from '../components/PageHeader'
import SideMenu from '../components/SideMenu'
import useTable from '../hooks/useTable'
import Controls from '../components/controls'

import getAllPatients from '../utils/transform/getAllPatients'

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  },
  appMain: {
    paddingLeft: '200px',
    width: '100%'
  },
  searchInput: {
    width: '75%'
  },
  newButton: {
    position: 'absolute',
    right: '10px'
  }
}))

const headCells = [
  { id: 'familyName', label: 'Family Name' },
  { id: 'name', label: 'Name' },
  { id: 'gender', label: 'Gender' },
  { id: 'birthDate', label: 'Birth Date' },
  { id: 'phone', label: 'Phone' },
  { id: 'email', label: 'Email' },
  { id: 'actions', label: 'Actions', disableSorting: true }
]

const PatientsPage = () => {
  // desde aqui borrar
  const [records, setRecords] = useState([])

  useEffect(() => {
    const getPatients = async () => {
      try {
        const { data } = await axios.get('http://localhost:8080/api/patients')
        const patients = getAllPatients(data)
        console.log(patients)
        setRecords(patients) // esto hay que cambiarlo
      } catch (error) {
        console.log(error)
        throw (error)
      }
    }
    getPatients()
  }, [])

  // hasta aqui

  const classes = useStyles()
  // const [records, setRecords] = useState(patientService.getAllPatients())
  // const datos = usePatientList()
  // console.log({ datos })
  // const [records, setRecords] = useState(datos)
  // const [records, setRecords] = useState(defaultData)
  const [recordForEdit, setRecordForEdit] = useState(null)
  // const history = useHistory()
  const [filterFn, setFilterFn] = useState({ fn: items => { return items } })
  const [openPopup, setOpenPopup] = useState(false)

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(records, headCells, filterFn)

  const handleSearch = e => {
    const target = e.target
    setFilterFn({
      fn: items => {
        if (target.value === '') { return items } else { return items.filter(x => x.familyName.toLowerCase().includes(target.value)) }
      }
    })
  }

  const addOrEdit = (patient, resetForm) => {
    if (patient.id === 0) { patientService.insertPatient(patient) } else { patientService.updatePatient(patient) }
    resetForm()
    setRecordForEdit(null)
    setOpenPopup(false)
    setRecords(records)
  }

  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }

  return (
        <>
            <SideMenu />
            <div className = {classes.appMain}>
                <MenuBar />
                <PageHeader
                    title = "Patients"
                    subtitle = "Patients form alpha"
                    icon = { <SupervisorAccountIcon fontSize='large' /> }
                />
                <Paper elevation="0" className = {classes.pageContent}>
                    <Toolbar>
                        <Controls.Input
                            label="Search Patients"
                            className={classes.searchInput}
                            InputProps={{
                              startAdornment: (<InputAdornment position={'start'}>
                                        <Search/>
                                    </InputAdornment>)
                            }}
                            onChange={handleSearch}
                        />
                        <Controls.Button
                            className = {classes.newButton}
                            text="Add New"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={() => { setOpenPopup(true); setRecordForEdit(null) }}
                        >
                        </Controls.Button>
                    </Toolbar>
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map(item => (
                                    <TableRow key = { item.indentifier }>
                                        <TableCell>{ item.familyName }</TableCell>
                                        <TableCell>{ item.name }</TableCell>
                                        <TableCell>{ item.gender }</TableCell>
                                        <TableCell>{ item.birthDate }</TableCell>
                                        <TableCell>{item.phone}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => openInPopup(item)}
                                            >
                                                <EditOutlinedIcon fontSize="small"/>
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                 color="secondary">
                                                <CloseIcon fontSize="small"/>
                                            </Controls.ActionButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                        <TblPagination />
                    </TblContainer>
                </Paper>
                <Controls.Popup
                    title = "New Patient"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}>
                    <PatientsForm
                        recordForEdit={recordForEdit}
                        addOrEdit = {addOrEdit}
                    />
                </Controls.Popup>
            </div>
            <CssBaseline/>
        </>
  )
}

export default PatientsPage
