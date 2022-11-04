import * as React from 'react';

function getMenuLabelName(label?: string, activeAlt?: boolean) {
  if (activeAlt) {
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: (label || '').replace(/&(\w)/, '<u>$1</u>'),
        }}
      />
    );
  } else {
    return (label || '').replace('&', '');
  }
}

export default getMenuLabelName;
