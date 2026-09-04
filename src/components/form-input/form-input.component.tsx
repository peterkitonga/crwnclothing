import React from 'react';

import './form-input.styles.scss';

interface FormInputProps extends React.ComponentPropsWithoutRef<'input'> {
  label?: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput(props: FormInputProps) {
  const { autoComplete, changeHandler, label, id, name, type, required, value } = props;
  const hasValue = (value as string).length > 0;

  return (
    <div className={'form-input-group'}>
      <input
        className={'form-input'}
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={changeHandler}
        autoComplete={autoComplete}
        required={required}
      />
      <label htmlFor={id} className={`form-input-label${hasValue ? ' shrink' : ''}`}>
        {label}
      </label>
    </div>
  );
}
