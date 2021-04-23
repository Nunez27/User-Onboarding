import React from 'react'

export default function OnBordingForm(props){

    const {values, submit, change, disabled, errors} = props;

    const onSubmit = (ev) => {
        ev.preventDefault();
        submit();
    }
    const onChange = (evt) =>{
        const {name, value, type, checked} = evt.target;
        const valueToUse = type === "checkbox" ? checked: value;
        change(name, valueToUse)
    }
    return (
        <form className='form-container' onSubmit={onSubmit}>
            <div className='form-group-submit'>
                <h2>Add Person</h2>

                <button id ='submitBtn' disabled={disabled}>Submit</button>
                { errors &&
                    <div className='errors'>
                        <div>{errors.name}</div>
                        <div>{errors.email}</div>
                        <div>{errors.password}</div>
                        <div>{errors.service}</div>
                    </div>
                }
            </div>

            <div className='form-inputs'>
                <label>
                    Name
                    <input
                        name='name'
                        type='text'
                        value={values.name}
                        onChange={onChange}
                        placeholder='Insert Name'

                    />
                </label>

                <label>
                    Email
                    <input 
                        name='email'
                        type='email'
                        value={values.email}
                        onChange={onChange}
                        placeholder='Insert Email'
                    />
                </label>

                <label>
                    Password
                    <input 
                        name='password'
                        type='password'
                        value={values.password}
                        onChange={onChange}
                        placeholder='Password'
                    />
                </label>

                <label>
                    Terms of Service
                    <input 
                        name='service'
                        type='checkbox'
                        value='service'
                        checked={values.service}
                        onChange={onChange}
                    />
                </label>
            </div>
        </form>
    );
}