
import React, { useEffect } from 'react';

const DisqusComments: React.FC = () => {
  useEffect(() => {
    const disqus_config = function (this: any) {
      this.page.url = window.location.href;
      this.page.identifier = 'carpark-finder-main';
    };
    (window as any).disqus_config = disqus_config;

    const d = document, s = d.createElement('script');
    s.src = 'https://irisng.disqus.com/embed.js';
    s.setAttribute('data-timestamp', String(+new Date()));
    (d.head || d.body).appendChild(s);

    return () => {
      const disqusScript = document.querySelector('script[src="https://irisng.disqus.com/embed.js"]');
      if (disqusScript) {
        disqusScript.remove();
      }
    };
  }, []);

  return (
    <div style={{ marginTop: '40px' }}>
      <div id="disqus_thread"></div>
      <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
    </div>
  );
};

export default DisqusComments;
