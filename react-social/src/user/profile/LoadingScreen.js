import Welcome from 'react-welcome-page';
import React from 'react';
export default function LoadingScreen() {
  return (
    <div>
      <Welcome
        loopDuration={1200}
        data={[
          {
            image: require('../../img/logo.png'),
            text: 'My Quote',
            imageAnimation: 'flipInX',
            textAnimation: 'bounce',
            backgroundColor: 'white',
            textColor: 'black',
          },
          {
            image: require('../../img/logo.png'),
            text: 'Breaking the ice...',
          },
          {
            image: require('../../img/logo.png'),
            textAnimation: 'rotateIn',
          },
        ]}
      />
      ;
    </div>
  );
}
