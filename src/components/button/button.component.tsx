import React from 'react';

import './button.styles.scss';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  buttonType?: string;
  children?: React.ReactNode;
}

const BUTTON_TYPE_CLASSES: Record<string, string> = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

export default function Button({ children, buttonType, ...otherProps }: ButtonProps) {
  return (
    <button className={`button-container${buttonType ? ' ' + BUTTON_TYPE_CLASSES[buttonType] : ''}`} {...otherProps}>
      {children}
    </button>
  );
}
