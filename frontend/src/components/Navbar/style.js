import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: '15',
        margin: '0px 0',
        display: 'flex',
        flexDirection: 'row',
        height : "8",
        justifyContent: 'space-between',
        // alignItems: 'center',
        padding: '10px 50px',
    },
    heading: {
        fontSize: '3rem',
        color: '#FF6347', 
        fontWeight: 'bold', 
        fontFamily: 'san-serif',
        justifyContent :'left',
        alignItems: 'center',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    },
    image: {
        marginLeft: '15px',
    },
    toolbar: {
        // display: 'flex',
        // justifyContent: 'flex-end',
        // width: '400px',
        minHeight: '56px', /* Default MUI AppBar height */
        display: 'flex',
        justifyContent: 'space-between',
    },
    menu: {
        backgroundColor: '#f9f9f9', // Light gray background for the dropdown
        borderRadius: '4px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow
    },
    menuItem: {
        fontSize: '16px',
        color: '#333', // Dark text color for menu items
        '&:hover': {
            backgroundColor: '#e0e0e0', // Light gray hover effect
        },
        '&:focus': {
            backgroundColor: '#d1d1d1', // Slightly darker gray on focus
            color: '#000', // Black text on focus
        },
    },
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px',
    },
    userName: {
        display: 'flex',
        alignItems: 'center',
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'left',
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));