import React, { useRef } from 'react';
import {
  useBooleanControl,
  useButtonControl,
  useNumberControl,
  useRadioControl,
  useStringControl,
} from 'storybox-react';
import { CodeInputReact } from 'code-input-react';

const StoryWrapper = ({ children }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    }}
  >
    {children}
  </div>
);

export const Customized = () => {
  const controlRef = useRef(null);

  const [length] = useNumberControl({
    name: 'length',
    min: 4,
    max: 8,
    defaultValue: 6,
    appearance: 'range',
    integerOnly: true,
    step: 1,
  });

  const [nth] = useNumberControl({
    name: 'nth',
    step: 1,
    integerOnly: true,
    min: 1,
    max: length,
    defaultValue: 1,
    appearance: 'range',
  });

  useButtonControl({
    name: 'focus on nth digit',
    onClick: () => {
      controlRef.current?.focus(nth - 1);
    },
  });

  const [autoFocus] = useBooleanControl({ name: 'autofocus', defaultValue: true });

  const [disabled] = useBooleanControl({ name: 'disabled', defaultValue: false });

  const [focusOnInvalid] = useBooleanControl({ name: 'focusOnInvalid', defaultValue: true });

  const [focusNextFilledDigit] = useBooleanControl({
    name: 'focusNextFilledDigit',
    defaultValue: false,
  });

  const [valid] = useBooleanControl({ name: 'valid', defaultValue: true });

  const [type] = useRadioControl({
    name: 'type',
    defaultValue: 'number',
    options: ['number', 'text'],
  });

  const [value, setValue] = useStringControl({
    name: 'value',
    defaultValue: '',
    maxLength: length,
    minLength: 0,
    washRegex: type === 'number' ? /\D/g : undefined,
  });

  return (
    <StoryWrapper>
      <CodeInputReact
        length={length}
        value={value}
        onChange={setValue}
        autoFocus={autoFocus}
        disabled={disabled}
        focusOnInvalid={focusOnInvalid}
        focusNextFilledDigit={focusNextFilledDigit}
        type={type}
        valid={valid}
        controlRef={controlRef}
      />
    </StoryWrapper>
  );
};
