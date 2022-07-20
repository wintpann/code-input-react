import React, {
  ChangeEventHandler,
  FC,
  KeyboardEventHandler,
  MutableRefObject,
  useEffect,
  useRef,
} from 'react';
import classNames from 'classnames';
import './index.scss';

export type CodeInputReactRef = {
  /**
   * Focus n-th digit.
   * @param [nth=0]
   */
  focus: (nth?: number) => void;
  /**
   * Use it if you need access for inputs
   */
  inputs: Array<HTMLInputElement | null>;
};

export type CodeInputReactProps = {
  /**
   * Digits count
   */
  length: number;
  /**
   * Current value
   */
  value: string;
  /**
   * Change handler
   */
  onChange: (value: string) => void;
  /**
   * Change handler, invokes only if all digits are filled
   */
  onComplete?: (value: string) => void;
  /**
   * Disabled flag
   * @param [disabled=false]
   */
  disabled?: boolean;
  /**
   * Valid flag
   * @param [valid=true]
   */
  valid?: boolean;
  /**
   * Focus first digit on mount flag
   * @param [autoFocus=true]
   */
  autoFocus?: boolean;
  /**
   * Digit type. Any text symbols or numbers
   * @param [type='number']
   */
  type?: 'number' | 'text';
  /**
   * Focus on first digit when *valid* becomes false, so user can fill out again
   * @param [focusOnInvalid=true]
   */
  focusOnInvalid?: boolean;
  /**
   * Focus next digit EVEN if it's already filled
   * @param [focusNextFilledDigit=false]
   */
  focusNextFilledDigit?: boolean;
  /**
   * Ref to control input outside
   */
  innerRef?: MutableRefObject<CodeInputReactRef | null>;
  /**
   * Container className
   */
  className?: string;
};

const WASH_REGEX: {
  ALLOW_SPACE: Record<string, RegExp>;
  DENY_SPACE: Record<string, RegExp>;
} = {
  ALLOW_SPACE: {
    number: /[^\d\s]/g,
  },
  DENY_SPACE: {
    number: /\D/g,
  },
} as const;
const SPACE_REGEX = /\s/g;
const EMPTY_VALUE = ' ';

const useExhaustiveEffect = useEffect;

export const CodeInputReact: FC<CodeInputReactProps> = ({
  length,
  value,
  onChange,
  onComplete,
  disabled = false,
  valid = true,
  autoFocus = true,
  type = 'number',
  focusOnInvalid = true,
  focusNextFilledDigit = false,
  innerRef,
  className,
}) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const paddedValue = value.padEnd(length).substring(0, length);

  const update = (
    newValue: string,
    target: HTMLInputElement,
    allowSpace: boolean,
    focusNewTarget: boolean,
  ) => {
    if (disabled) return;

    const washRegexGroup = WASH_REGEX[allowSpace ? 'ALLOW_SPACE' : 'DENY_SPACE'];
    const updated = washRegexGroup[type] ? newValue.replace(washRegexGroup[type], '') : newValue;

    if (!updated) return;

    const index = Number(target.dataset.index);
    const beforeUpdated = paddedValue.substring(0, index);
    const afterUpdated = paddedValue.substring(index + updated.length, length);
    const updatedValue = (beforeUpdated + updated + afterUpdated).substring(0, length);

    onChange(updatedValue);

    const isComplete = updatedValue.replace(SPACE_REGEX, '').length === length;
    if (isComplete && onComplete) {
      onComplete(updatedValue);
    }

    if (!focusNewTarget) return;

    const nextSiblingTarget = inputsRef.current[index + updated.length];
    const nextSiblingTargetUnfilled = updatedValue[index + updated.length] === EMPTY_VALUE;
    const currentTarget = inputsRef.current[index];

    const nextTargetIndex = updatedValue.split('').findIndex((letter) => letter === EMPTY_VALUE);
    const nextTarget = inputsRef.current[nextTargetIndex];
    const nextTargetIsUnfilled = nextTargetIndex !== -1;

    if (nextSiblingTarget && (nextSiblingTargetUnfilled || focusNextFilledDigit)) {
      nextSiblingTarget.focus();
    } else if (nextTarget && nextTargetIsUnfilled) {
      nextTarget.focus();
    } else if (currentTarget) {
      currentTarget.blur();
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    update(e.target.value, e.target, false, true);

  const handleKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    const index = Number(target.dataset.index);

    const nextTarget = inputsRef.current[index + 1];
    const prevTarget = inputsRef.current[index - 1];

    const isMetaEvent = e.ctrlKey || e.altKey || e.metaKey;
    if (isMetaEvent) return;

    e.preventDefault();

    switch (e.key) {
      case 'Backspace': {
        update(EMPTY_VALUE, target, true, false);
        if (prevTarget) prevTarget.focus();
        return;
      }
      case 'ArrowLeft':
      case 'ArrowUp': {
        if (prevTarget) prevTarget.focus();
        return;
      }
      case 'ArrowRight':
      case 'ArrowDown': {
        if (nextTarget) nextTarget.focus();
        return;
      }
      case 'Tab': {
        if (e.shiftKey && prevTarget) prevTarget.focus();
        if (!e.shiftKey && nextTarget) nextTarget.focus();
        return;
      }
      default:
        break;
    }

    const isSymbol = e.key.length === 1;
    if (isSymbol) update(e.key, target, false, true);
  };

  useExhaustiveEffect(() => {
    const firstTarget = inputsRef.current[0];

    if (!valid && focusOnInvalid && firstTarget) firstTarget.focus();
  }, [valid]);

  useExhaustiveEffect(() => {
    if (!innerRef) return;

    innerRef.current = {
      focus: (nth = 0) => {
        const target = inputsRef.current[nth];
        if (target) target.focus();
      },
      inputs: inputsRef.current,
    };
  }, []);

  return (
    <div
      className={classNames({
        'code-input-react': true,
        [className as string]: Boolean(className),
        'code-input-react--invalid': !valid,
        'code-input-react--disabled': disabled,
      })}
    >
      {paddedValue
        .substring(0, length)
        .split('')
        .map((letter, index) => (
          <input
            type="text"
            data-index={index}
            autoFocus={autoFocus && index === 0}
            className="code-input-react__digit"
            key={`input_${index}`}
            onFocus={(e) => e.target.select()}
            value={letter === EMPTY_VALUE ? '' : letter}
            onChange={handleChange}
            onKeyDown={handleKeydown}
            disabled={disabled}
            inputMode={type === 'number' ? 'numeric' : 'text'}
            ref={(node) => {
              inputsRef.current[index] = node;
              if (innerRef?.current?.inputs) {
                innerRef.current.inputs[index] = node;
              }
            }}
          />
        ))}
    </div>
  );
};
