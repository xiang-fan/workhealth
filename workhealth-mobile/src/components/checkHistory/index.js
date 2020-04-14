import React from 'react';
import Button from '../../components/button';
import Input from '../../components/input';

function CheckHistory({search, clear, content, value, onChange, history, label, buttonText, progress}) {
  return (
    <>
      <Input
        text={value}
        onChange={onChange}
        label={label}
        containerStyle={{ marginVertical: 10 }}
        onClear={history && clear}
        editable={history === null}
      />
      <Button
        fetching={progress}
        text={buttonText}
        onPress={search}
        disabled={history}
      />
      {content}
    </>
  );
}

export default CheckHistory;
