import React from 'react';
import {useIntl} from 'react-intl';
import {Box, Typography} from '@mui/material';

function Profile(props) {
  const intl = useIntl();

  return (
    <Box
      flexDirection={'column'}
      flex={1}
      justifyContent={'center'}
      alignItems={'center'}
      display={'flex'}
      height={'100%'}>
      <Typography variant="h6">
        {intl.formatMessage({id: 'label.profile'})}
      </Typography>
    </Box>
  );
}

export default Profile;
