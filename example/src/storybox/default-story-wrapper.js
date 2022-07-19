const style = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const DefaultStoryWrapper = ({ children }) => <div style={style}>{children}</div>;
