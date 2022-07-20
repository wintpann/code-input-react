import React, { useState } from 'react';
import { CodeInputReact } from 'code-input-react';
import { DefaultStoryWrapper } from './default-story-wrapper';
import { useButtonControl } from 'storybox-react';

const validCode = '123456';
const codeLength = 6;
const validate = (code) =>
  new Promise((resolve) => setTimeout(() => resolve(code === validCode), 500));

export const DefaultUsage = () => {
  const [state, setState] = useState({
    value: '',
    valid: true,
    disabled: false,
    validating: false,
    ok: false,
  });

  const onCodeChange = async (code) => {
    setState({ value: code, valid: true, disabled: false, validating: false, ok: false });
    const numbers = code.replace(/\S/g, '');
    if (numbers.length !== codeLength) return;

    setState((prev) => ({ ...prev, disabled: true, validating: true }));
    const isValid = await validate(code);
    setState((prev) => ({
      valid: isValid,
      disabled: isValid,
      value: isValid ? prev.value : '',
      validating: false,
      ok: isValid,
    }));
  };

  useButtonControl({
    name: 'start over',
    onClick: () =>
      setState({
        value: '',
        valid: true,
        disabled: false,
        validating: false,
        ok: false,
      }),
  });

  return (
    <DefaultStoryWrapper>
      <CodeInputReact
        length={codeLength}
        onChange={onCodeChange}
        value={state.value}
        disabled={state.disabled}
        valid={state.valid}
      />
      {state.validating && <div>validating code ...</div>}
      {state.ok && <div>ok!</div>}
    </DefaultStoryWrapper>
  );
};
