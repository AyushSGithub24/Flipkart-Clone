import {  Grid, styled } from '@mui/material';

const ImageURL = [
    'https://rukminim2.flixcart.com/fk-p-flap/844/140/image/9db0c0958d540188.jpg?q=50',
    'https://rukminim2.flixcart.com/fk-p-flap/844/140/image/9db0c0958d540188.jpg?q=50',
    'https://rukminim1.flixcart.com/flap/960/960/image/1ce0c4c1fb501b45.jpg?q=50',
    'https://rukminim1.flixcart.com/flap/3006/433/image/4789bc3aefd54494.jpg?q=50'
];

const Wrapper = styled(Grid)`
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
`;

const Image = styled('img')(({ theme }) => ({ 
    display: 'flex',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('md')]: {
        objectFit: 'cover',
        height: 120
    }
}));

const MidSection = ({idx}) => {
    return (
        <>
    
            <Image src={ImageURL[idx]} />
        </>
    )
}

export default MidSection;