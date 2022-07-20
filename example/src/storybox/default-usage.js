import React, { useState } from 'react';
import { CodeInputReact } from 'code-input-react';
import { DefaultStoryWrapper } from './default-story-wrapper';
import { useButtonControl } from 'storybox-react';
import { style } from './style';

/**
 * Common practice is to create a wrapper around any third-party component to customize it for your needs
 */
const MyInputCode = ({ validate, length }) => {
  const [value, setValue] = useState('');
  const [meta, setMeta] = useState({ valid: true, disabled: false, loading: false });

  const onComplete = async (code) => {
    setMeta({ valid: true, disabled: true, loading: true });
    const isValid = await validate(code);
    setMeta({ valid: isValid, disabled: isValid, loading: false });
    if (!isValid) setValue('');
  };

  return (
    <div>
      <CodeInputReact
        length={length}
        value={value}
        onChange={setValue}
        onComplete={onComplete}
        valid={meta.valid}
        disabled={meta.disabled}
      />
      {meta.loading && <div style={style.textSmall}>checking...</div>}
    </div>
  );
};

const validateCodeAPI = (code) =>
  new Promise((resolve) => setTimeout(() => resolve(code === '1234'), 1000));

const STEP = {
  PRE_VALIDATING: 0,
  VALIDATING: 1,
  VALIDATED: 2,
};

const DefaultStory = () => {
  const [step, setStep] = useState(STEP.PRE_VALIDATING);

  const validate = async (code) => {
    const isValid = await validateCodeAPI(code);
    if (isValid) setStep(STEP.VALIDATED);
    return isValid;
  };

  return (
    <div>
      {step === STEP.PRE_VALIDATING && (
        <button style={style.button} onClick={() => setStep(STEP.VALIDATING)}>
          Enter code! (1234)
        </button>
      )}
      {step === STEP.VALIDATING && <MyInputCode length={4} validate={validate} />}
      {step === STEP.VALIDATED && <div style={style.text}>you're good to go!</div>}
    </div>
  );
};

export const DefaultUsage = () => {
  const [key, setKey] = useState(0);

  useButtonControl({
    name: 'start over',
    onClick: () => {
      // changing key to force remount component
      setKey(key + 1);
    },
  });

  return (
    <DefaultStoryWrapper>
      <DefaultStory key={key} />
    </DefaultStoryWrapper>
  );
};
