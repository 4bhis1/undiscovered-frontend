import React from 'react';
import {useLocale} from '../../hooks/useLocale';
import {Button, Icon} from '@mui/material';

function LocaleSwitcher() {
  const {toggleLocale, locale} = useLocale();
  const icons = void 0;
  return (
    <Button onPress={toggleLocale}>
      <Icon
        source={locale === 'en' ? icons?.flagUk : icons?.flagFr}
        style={{width: '100%', height: '100%'}}
      />
    </Button>
  );
}

export default LocaleSwitcher;
