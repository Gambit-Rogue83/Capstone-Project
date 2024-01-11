console.log('JS is connected')

const baseURL = `http://localhost:4000`

//_______________selecting elements____________________
const patient = document.querySelector('#new-visit')
const segment = document.querySelectorAll('.segment')
const sign = document.querySelector('#sign')
const history = document.querySelector('.patient-portal')
const appointment = document.querySelector('#appointment')
const soap = document.querySelector('#soap')

//__________________axios requests_______________________
const getAllPatients = () => {
    axios.get(`${baseURL}/api/getAllPatients`)
    .then((res) =>{
        console.log(res.data)
        let patientNames = res.data
        patientNames = patientNames.sort() //alphabetize patient details
        let dropdown = patient
        dropdown.innerHTML = ''

        for(i = 0; i < patientNames.length; i++){
            let option = document.createElement('option')
            option.value = patientNames[i].id
            option.textContent = `${patientNames[i].first_name} ${patientNames[i].last_name}`
            dropdown.add(option)
        }

    })
    .catch((error) => {
        console.error("Error fetching patient data:", error);
      })
}

const getHistory = (e) =>{
    axios.get(`${baseURL}/api/history/${e.target.value}`)
    .then((res) =>{
        console.log(res.data)
        let patientVisits = res.data
        patientVisits = patientVisits.sort()
        let dropdownVisit = appointment
        dropdownVisit.innerHTML = ''

        for(i = 0; i < patientVisits.length; i++){
            let option = document.createElement('option')
            option.value = patientVisits[i].id
            option.textContent = `${patientVisits[i].date}`
            dropdownVisit.add(option)
        }

    })
    .catch((error) => {
        console.error("Error fetching patient data:", error);
      })
}
const displayNotes = () => {
    let selectDate = document.getElementById('appointment').value
    let visitHistoryDiv = document.getElementById('visitHistory')

    // Clear existing visit history
    visitHistoryDiv.innerHTML = ''
    console.log(selectDate)


    // Fetch visit history for the selected date
    axios.get(`${baseURL}/api/getVisit?id=${selectDate}`)
      .then((res) => {
        let visitHistory = res.data
        console.log(visitHistory[0])
        const {file, listing} = visitHistory[0]
        // Display visit history in the scrollable view
          let visitNote = document.createElement('p')
          visitNote.textContent = file
          let visitNote2 = document.createElement('p')
          visitNote2.textContent = listing
          visitHistoryDiv.appendChild(visitNote)
          visitHistoryDiv.appendChild(visitNote2)
      })
      .catch((error) => {
        console.error("Error fetching visit history:", error)
      })
  }

const complete = e => {
    e.preventDefault()
    let adjustment = document.querySelectorAll('.selected')
    let values = []
    adjustment.forEach((adj) => {
        values.push(adj.value)
    })
    let body = {
        patient_id: patient.value,
        file: soap.value,
        listing: values

    }
    console.log(body)
    axios.post(`${baseURL}/api/history`, body)
    .then((res) =>{
        console.log(res.data)

    })

}
//_______________________________________________________


// manipulating the buttons for the form
const addSegment = e => {
    let btn = e.target
    if(btn.classList.contains('segment')){ //changing the class
        btn.classList.remove('segment')
        btn.classList.add('selected')
    } else {
        btn.classList.remove('selected')
        btn.classList.add('segment')
    }
}

// Listen
sign.addEventListener('submit', complete)
segment.forEach((btn, index, arr) =>{
    btn.addEventListener('click', addSegment)
})


patient.addEventListener('change', getHistory)
appointment.addEventListener('change', displayNotes)

for(i = 0; i < segment.length; i++){
        segment[i].addEventListener('click', addSegment)
    }

getAllPatients()
