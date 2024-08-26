import React from 'react';
import ReactPlayer from 'react-player';

interface IBackgroundMusicProps {
  songUrl : string;
  play? : boolean
}
const BackgroundMusic: React.FC<IBackgroundMusicProps> = ({ songUrl, play = true}) => {
  return (
    <div style={{ display: 'none' }}>
      <ReactPlayer
        url={songUrl}
        playing={play}
        loop
        controls={false}
        volume={0.5}
        muted={false}
        width="0"
        height="0"
      />
    </div>
  );
};

export default BackgroundMusic;
