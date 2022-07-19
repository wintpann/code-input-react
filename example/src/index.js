import React from 'react';
import ReactDOM from 'react-dom/client';
import 'storybox-react/dist/styles.css';
import { StoryBox } from 'storybox-react';
import { stories } from './storybox/stories';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<StoryBox stories={stories} />);
