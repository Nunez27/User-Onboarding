import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as yup from 'yup'
import schema from './validation/schemas'
import './App.css';
import OnBordingForm from './componets/form'
import Employee from './componets/employee'


const initialFormValues = {
  name:'',
  email: '',
  password: '',
  service: false,
}
const initialFormErrors = {
  name:'',
  email: '',
  password: '',
  service:'',
}
const initialForm = []
const initialDisabled = true

function App() {

  const [person, setPerson] = useState(initialForm)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [ disabled, setDisabled] = useState(initialDisabled)
  const [ formErrors, setFormErrors] = useState(initialFormErrors)

  const postNewPerson = newPerson =>{
    axios
    .post('https://reqres.in/api/users', newPerson)
    .then((res) => {
      setPerson([res.data, ...person])
      setFormValues(initialFormValues)
    })
    .catch((err) =>{
      console.log(err)
    })
  };

  const inputChange = (name, value) => {
    yup
      .reach(schema, name) 
      .validate(value) 
      .then(() => {   
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })

      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value 
    })
  };

  const onSubmit = () =>{
    const newPerson = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password:formValues.password.trim(),
      services: ['service'].filter(
        (service) => formValues[service]
      ),
    }
    postNewPerson(newPerson)
  };

  useEffect(() => {
    schema
    .isValid(formValues)
    .then((valid) => {
      setDisabled(!valid);
    })
  }, [formValues]);

  return (
    <div className="App">
      <OnBordingForm
      values={formValues}
      change={inputChange}
      submit={onSubmit}
      disabled={disabled}
      errors={formErrors} />

{
        person.map(employee => {
          return(
          <Employee key={employee.id} details={employee}/>
          )
      })
      }
    </div>
  );

// const formValues = {
//   name: '',
//   email: '',
//   password: '',
//   service: false
// }

// const formValuesError = {
//   name: '',
//   email: '',
//   password: '',
//   service: ''
// }

// const form = []
// const disabled = true

// function App() {
//  const [people, setPeople] = useState(form);
//  const [initialFormValues, setInitialFormValues] = useState(formValues);
//  const [unable, setUnable] = useState(disabled);
//  const [errors, setErrors] = useState(formValuesError);

// }

// const axiosPostNewPerson = newPerson => {
//   axios
//   .post('https://reqres.in/api/users', newPerson)
//   .then(res => {
//     setPeople([res.data, ...people])
//     setinitialFormValues(formValues);
//   })
//   .catch(err => {
//     return err
//   })

  
}

export default App;
