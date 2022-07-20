import { style } from './style';

export const DefaultStoryWrapper = ({ children }) => (
  <div style={style.storyWrapper}>{children}</div>
);
