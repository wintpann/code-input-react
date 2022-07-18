import React, { useRef, useState } from 'react';
import {
  useBooleanControl,
  useButtonControl,
  useNumberControl,
  useRadioControl,
} from 'storybox-react';
import { CodeInputReact, CodeInputReactProps, CodeInputReactRef } from '../core';

const Default = () => {
  const controlRef = useRef<CodeInputReactRef>({});

  const [length] = useNumberControl({
    name: 'length',
    min: 4,
    max: 8,
    defaultValue: 4,
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
      controlRef.current.focus?.(nth - 1);
    },
  });

  const [autoFocus] = useBooleanControl({ name: 'autofocus', defaultValue: true });

  const [disabled] = useBooleanControl({ name: 'disabled', defaultValue: false });

  const [focusUnfilled] = useBooleanControl({ name: 'focusUnfilled', defaultValue: true });

  const [focusOnInvalid] = useBooleanControl({ name: 'focusOnInvalid', defaultValue: true });

  const [valid] = useBooleanControl({ name: 'valid', defaultValue: true });

  const [type] = useRadioControl({
    name: 'type',
    defaultValue: 'number',
    options: ['number', 'text'],
  });

  const [value, setValue] = useState('');

  return (
    <CodeInputReact
      length={length}
      value={value}
      onChange={setValue}
      autoFocus={autoFocus}
      disabled={disabled}
      focusUnfilled={focusUnfilled}
      focusOnInvalid={focusOnInvalid}
      type={type as CodeInputReactProps['type']}
      valid={valid}
      controlRef={controlRef}
    />
  );
};

export const stories = { Default };
