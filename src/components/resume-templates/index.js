import { clsx } from 'clsx';
import ModernTemplate  from './modern';
import { CreativeTemplate } from './creative';

export const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and professional with a modern accent',
    component: ModernTemplate,
    preview: (props) => <ModernTemplate {...props} preview={true} />
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold header with a unique two-column layout',
    component: CreativeTemplate,
    preview: (props) => <CreativeTemplate {...props} preview={true} />
  }
];
