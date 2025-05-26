import { red } from '@mui/material/colors';
import { components } from './components';

const themeOptions = {
  typography: {
    fontFamily: 'iranyekan, Arial, sans-serif',
    
    fontSize: 14,
    body1: { fontSize: '14px' },
  },
  status: { danger: red[500] },
  components: { ...components },
  
};

export default themeOptions;
